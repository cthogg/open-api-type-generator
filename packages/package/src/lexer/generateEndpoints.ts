import { sentenceCase } from "change-case";
import {
  RecordField,
  RecordType,
  SimpleType,
} from "generate-runtypes/dist/types";
import { Endpoint, OpenApi, SchemaArray } from "./types";

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
        responseBody: {
          name: convertToDTOName(fullPath),
          type: generateRootTypeOfArray(schema),
        },
      },
    };

    return endpoint;
  });
  return allGetEndpoints;
};
