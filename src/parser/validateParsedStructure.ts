import { z } from "zod";

const OpenApiSpec = z.object({
  openapi: z.string().startsWith("3."), //only supporting open api version 3 at the moment // could provide custom errors to show this with https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md#customizing-errors-with-zoderrormap
  paths: z.object({
    "/artists": z.object({}),
  }),
});

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

type OpenApiSpecType = z.infer<typeof OpenApiSpec>;

export { OpenApiSpec, OpenApiSpecType };
