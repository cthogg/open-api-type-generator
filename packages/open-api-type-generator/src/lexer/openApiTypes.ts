import * as r from "runtypes";

const infoSchema = r.Record({
  version: r.String,
  title: r.String,
  description: r.String,
});

export const openApiArraySchema = r.Record({
  type: r.Literal("array"),
  items: r.Record({
    type: r.Literal("object"),
    required: r.Array(r.String),
    properties: r.Dictionary(r.Record({ type: r.String })),
  }),
});

const getRuntype = r.Record({
  get: r.Record({
    description: r.String,
    responses: r.Record({
      "200": r.Record({
        description: r.String,
        content: r.Record({
          "application/json": r.Record({
            schema: openApiArraySchema,
          }),
        }),
      }),
    }),
  }),
});

export const openApiSchema = r.Record({
  openapi: r.String.withConstraint((s) => s.startsWith("3.")),
  info: infoSchema,
  paths: r.Dictionary(
    getRuntype,
    r.String.withConstraint((s) => s.startsWith("/"))
  ),
});

// input is the openAPI schema
// output is the generate runtype
