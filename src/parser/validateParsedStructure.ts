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

const Info = z.object({
  version: z.string(),
  title: z.string(),
  description: z.string(),
});

const schemaArray = z.object({
  type: z.literal("array"),
  items: z.object({
    type: z.literal("object"),
    required: z.array(z.string()),
    properties: z.record(z.string(), z.object({ type: z.string() })),
  }),
});

const nonSpecificSpec = z.object({
  openapi: z.string().startsWith("3."),
  info: Info,
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
                schema: schemaArray,
              }),
            }),
          }),
        }),
      }),
    })
  ),
});

type NonSpecitifcSpec = z.infer<typeof nonSpecificSpec>;
type SchemaArray = z.infer<typeof schemaArray>;
// {
//   endpoint: "GET /artists",
//   responseBody: r.Array(
//     r.Record({
//       username: r.String,
//       artist_name: r.String.optional(),
//       artist_genre: r.String.optional(),
//       albums_recorded: r.Number.optional(),
//     })
//   ),
// }

type Endpoint = {
  endpoint: string;
  responseBody: z.ZodType;
};

const generateZodFromSchema = (schema: SchemaArray): z.ZodType => {
  const listOfProperties = schema.items.properties;
  const listOfPropertiesKeys = Object.keys(listOfProperties).map((key) => {
    const property = listOfProperties[key];
    return {
      [key]: property,
    };
  });
  console.log("listOfPropertiesKeys", listOfPropertiesKeys);
  return z.object({});
};

const generateZodPaths = (spec: NonSpecitifcSpec): Endpoint[] => {
  const allPaths = spec.paths;
  const allPathsKeys: Endpoint[] = Object.keys(allPaths).map((path) => {
    const pathObject = allPaths[path];
    const pathSchema: z.ZodType = nonSpecificSpec.shape.paths.keySchema;
    const schema =
      pathObject.get.responses["200"].content["application/json"].schema;
    const endpoint: Endpoint = {
      endpoint: `GET ${path}`,
      responseBody: generateZodFromSchema(schema),
    };
    return endpoint;
  });
  return allPathsKeys;
};

export const generateEndpoints = (fileAsJson: string): Endpoint[] => {
  const files = nonSpecificSpec.parse(exampleFileAsJson);
  return generateZodPaths(files);
};

// fileAsJson {
//     openapi: '3.0.0',
//     info: {
//       version: '1.0.0',
//       title: 'Simple API',
//       description: 'A simple API to illustrate OpenAPI concepts'
//     },
//     servers: [ { url: 'https://example.io/v1' } ],
//     components: { securitySchemes: { BasicAuth: [Object] } },
//     security: [ { BasicAuth: [] } ],
//     paths: { '/artists': { get: [Object] } }
//   }

export { isValidOpenApiSpec };
