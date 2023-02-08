import { z } from "zod";
const infoSchema = z.object({
  version: z.string(),
  title: z.string(),
  description: z.string(),
});

export const openApiArraySchema = z.object({
  type: z.literal("array"),
  items: z.object({
    type: z.literal("object"),
    required: z.array(z.string()),
    properties: z.record(z.string(), z.object({ type: z.string() })),
  }),
});

export const openApiSchema = z.object({
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
                schema: openApiArraySchema,
              }),
            }),
          }),
        }),
      }),
    })
  ),
});
