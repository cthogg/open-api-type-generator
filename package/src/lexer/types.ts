import { RootType } from "generate-runtypes";
import rt from "runtypes";
import { openApiArraySchema, openApiSchema } from "./openApiTypes";

export type Endpoint = {
  //FIXME: create a type which has is of GET /artists
  [key: EndpointKey]: {
    responseBody: rt.Runtype;
    responseBodyTwo: RootType;
  };
};
export type EndpointKey = `GET /${string}`;
export type OpenApi = rt.Static<typeof openApiSchema>;
export type SchemaArray = rt.Static<typeof openApiArraySchema>;
