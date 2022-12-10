import SwaggerParser from "@apidevtools/swagger-parser";
import { z } from "zod";

const isValidOpenApiSpec = async (fileAsJson: string) => {
  console.log("fileAsJson", fileAsJson);
  try {
    await SwaggerParser.parse(fileAsJson);
    return true;
  } catch (err) {
    //FIXME: add a logger for this
    console.error(err);
    return false;
  }
};
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

const infoSchema = z.object({
  version: z.string(),
  title: z.string(),
  description: z.string(),
});

const getArraySchema = z.object({
  type: z.literal("array"),
  items: z.object({
    type: z.literal("object"),
    required: z.array(z.string()),
    properties: z.record(z.string(), z.object({ type: z.string() })),
  }),
});

const openApiSchema = z.object({
  openapi: z.string().startsWith("3."),
  info: infoSchema,
  paths: z.record(
    z.string().startsWith("/"),
    z.object({
      get: z.object({
        description: z.string(),
        responses: z.object({
          "200": z.object({
            description: z.string(),
            content: z.object({
              "application/json": z.object({
                schema: getArraySchema,
              }),
            }),
          }),
        }),
      }),
    })
  ),
});

type NonSpecitifcSpec = z.infer<typeof openApiSchema>;
type SchemaArray = z.infer<typeof getArraySchema>;

type Endpoint = {
  endpoint: string;
  responseBody: z.ZodType;
};

const generateResponseBodyOfArray = (schema: SchemaArray): z.ZodType => {
  const listOfProperties = schema.items.properties;
  const listOfPropertiesKeys = Object.keys(listOfProperties).map((key) => {
    const property = listOfProperties[key];
    return {
      [key]: property,
    };
  });
  return z.object({});
};

const generateAllEndpoints = (spec: NonSpecitifcSpec): Endpoint[] => {
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

export const generateEndpoints = (fileAsJson: string): Endpoint[] => {
  const files = openApiSchema.parse(fileAsJson);
  return generateAllEndpoints(files);
};

export { isValidOpenApiSpec };
