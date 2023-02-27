import { z } from "zod";
import { Endpoint, OpenApi, SchemaArray } from "./types";

const getZodType = (type: string): z.ZodType => {
  switch (type) {
    case "string":
      return z.string();
    case "integer":
      return z.number();
    default:
      return z.unknown();
  }
};

const generateResponseBodyOfArray = (schema: SchemaArray): z.ZodType => {
  const listOfProperties = schema.items.properties;
  const listOfPropertiesKeys = Object.keys(listOfProperties).map((key) => {
    const property = listOfProperties[key];
    return {
      [key]: getZodType(property.type),
    };
  });
  const mergedListOfPropertyKeys = listOfPropertiesKeys.reduce((acc, curr) => {
    return { ...acc, ...curr };
  });
  return z.object(mergedListOfPropertyKeys);
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
