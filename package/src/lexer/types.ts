import { z } from "zod";
import { openApiArraySchema, openApiSchema } from "./openApiTypes";

/*FIXME: this needs to be something like: {
 [key: string]: {
responseBody: z.ZodType;
  }
  */
export type Endpoint = {
  endpoint: string;
  responseBody: z.ZodType;
};

export type OpenApi = z.infer<typeof openApiSchema>;
export type SchemaArray = z.infer<typeof openApiArraySchema>;
