import rt from "runtypes";
import { openApiArraySchema, openApiSchema } from "./openApiTypes";

export type Endpoint = {
  [key: string]: {
    responseBody: rt.Runtype;
  };
};

export type OpenApi = rt.Static<typeof openApiSchema>;
export type SchemaArray = rt.Static<typeof openApiArraySchema>;
