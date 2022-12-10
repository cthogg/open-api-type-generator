import { z } from "zod";
import { OpenApi, SchemaArray } from "./openApiTypes";

const exampleFileAsJson = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Simple API",
    description: "A simple API to illustrate OpenAPI concepts",
  },
  servers: [{ url: "https://example.io/v1" }],
  components: {
    securitySchemes: { BasicAuth: { type: "http", scheme: "basic" } },
  },
  security: [{ BasicAuth: [] }],
  paths: {
    "/artists": {
      get: {
        description: "Returns a list of artists",
        responses: {
          "200": {
            description: "Successfully returned a list of artists",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["username"],
                    properties: {
                      artist_name: { type: "string" },
                      artist_genre: { type: "string" },
                      albums_recorded: { type: "integer" },
                      username: { type: "string" },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
  },
};

type Endpoint = {
  endpoint: string;
  responseBody: z.ZodType;
};

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
      endpoint: `GET ${path}`,
      responseBody: generateResponseBodyOfArray(schema),
    };
    return endpoint;
  });
  return allGetEndpoints;
};
