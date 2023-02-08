import { z } from "zod";
import { openApiArraySchema, openApiSchema } from "./openApiTypes";

export type Endpoint = {
  endpoint: string;
  responseBody: z.ZodType;
};

export type OpenApi = z.infer<typeof openApiSchema>;
export type SchemaArray = z.infer<typeof openApiArraySchema>;
