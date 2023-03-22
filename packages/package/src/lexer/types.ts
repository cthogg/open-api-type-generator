import { RootType } from "generate-runtypes";
import rt from "runtypes";
import { openApiArraySchema, openApiSchema } from "./openApiTypes";

export type Endpoint = {
  [key: EndpointKey]: {
    responseBody: RootType;
  };
};
export type EndpointKey = `GET /${string}`;
export type OpenApi = rt.Static<typeof openApiSchema>;
export type SchemaArray = rt.Static<typeof openApiArraySchema>;
