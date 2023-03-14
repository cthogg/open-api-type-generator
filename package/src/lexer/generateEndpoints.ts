import { sentenceCase } from "change-case";
import {
  RecordField,
  RecordType,
  SimpleType,
} from "generate-runtypes/dist/types";
import * as rt from "runtypes";
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

const getRootType = (type: string) => {
  const stringType: SimpleType = { kind: "string" };
  const integerType: SimpleType = { kind: "number" };
  const unknownType: SimpleType = { kind: "unknown" };

  switch (type) {
    case "string":
      return stringType;
    case "integer":
      return integerType;
    default:
      return unknownType;
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

const generateRootTypeOfArray = (schema: SchemaArray): RecordType => {
  const listOfProperties = schema.items.properties;
  const recordTypes: RecordField[] = Object.keys(listOfProperties).map(
    (property) => {
      return {
        name: property,
        type: getRootType(listOfProperties[property].type),
      };
    }
  );

  return {
    kind: "record",
    fields: recordTypes,
  };
};

function convertToDTOName(str: string): string {
  const [httpMethod, endpoint] = str.split(" ");
  const endpointParts = endpoint.split("/");
  const dtoName = endpointParts[1];
  return `${sentenceCase(httpMethod)}${sentenceCase(dtoName)}DTO`;
}

export const generateEndpoints = (spec: OpenApi): Endpoint[] => {
  const allGetEndpoints: Endpoint[] = Object.keys(spec.paths).map((path) => {
    const pathObject = spec.paths[path];
    const schema =
      pathObject.get.responses["200"].content["application/json"].schema;
    const fullPath = `GET ${path}`;
    const endpoint: Endpoint = {
      [fullPath]: {
        responseBody: generateResponseBodyOfArray(schema),
        responseBodyTwo: {
          name: convertToDTOName(fullPath),
          type: generateRootTypeOfArray(schema),
        },
      },
    };

    return endpoint;
  });
  return allGetEndpoints;
};
