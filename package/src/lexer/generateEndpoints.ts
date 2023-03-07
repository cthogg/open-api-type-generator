import rt from "runtypes";
import { Endpoint, OpenApi, SchemaArray } from "./types";

type Runtype = rt.Runtype;

const getRuntype = (type: string): Runtype => {
  switch (type) {
    case "string":
      return rt.String;
    case "integer":
      return rt.Number;
    default:
      return rt.Unknown;
  }
};

const generateResponseBodyOfArray = (schema: SchemaArray): Runtype => {
  const listOfProperties = schema.items.properties;
  const listOfPropertiesKeys = Object.keys(listOfProperties).map((key) => {
    const property = listOfProperties[key];
    return {
      [key]: getRuntype(property.type),
    };
  });
  const mergedListOfPropertyKeys = listOfPropertiesKeys.reduce((acc, curr) => {
    return { ...acc, ...curr };
  });
  return rt.Record(mergedListOfPropertyKeys);
};

export const generateEndpoints = (spec: OpenApi): Endpoint[] => {
  const allGetEndpoints: Endpoint[] = Object.keys(spec.paths).map((path) => {
    const pathObject = spec.paths[path];
    const schema =
      pathObject.get.responses["200"].content["application/json"].schema;

    const endpoint: Endpoint = {
      [`GET ${path}`]: {
        responseBody: generateResponseBodyOfArray(schema),
      },
    };

    return endpoint;
  });
  return allGetEndpoints;
};
