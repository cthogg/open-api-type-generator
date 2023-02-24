// import * as r from "runtypes";
// import { BACKEND_BASE, isProductionEnvironment } from '../../const';
// import { logToExternalErrorHandlers } from '../../utils/customConsole';
// import { ErrorCode, ErrorCodeRuntype } from '../errorCodes';
import { z } from "zod";
import {
  EndpointRegistry,
  endpointRegistry,
  RegisteredHttpEndpoint,
} from "../../mocks/mockEndpoints";

/**
 * Utility function that returns the type of the requestBody for a given endpoint.
 */
// export type ExtractRequestBody<T extends RegisteredHttpEndpoint> = z.infer<
//   EndpointRegistry[T]["requestBody"]
// >;

/**
 * Utility function that returns the type of the requestBody for a given endpoint.
 */
export type ExtractResponseBody<T extends RegisteredHttpEndpoint> = z.infer<
  EndpointRegistry[T]["responseBody"]
>;

function assertResponseBodyShape({
  runtype,
  responseBody,
}: {
  runtype: z.ZodType<unknown>;
  responseBody: unknown;
}) {
  console.log("responseBody", responseBody);

  try {
    runtype.parse(responseBody);
  } catch (runtypeError) {
    console.error("response body did not match expected shape", runtypeError);

    throw new Error("response body did not match expected shape");
  }
}

/**
 * Removes all properties from type `TObject` whose values are of type `TPropertyValue`.
 *
 * Examples (see unit tests for more examples):
 *
 * ```ts
 * type X = RemoveByValue<{ a: number, b: string, c: string}, number>
 * // X will be { b: string, c: string }
 *
 * type Y = RemoveByValue<{ key1: boolean, key2: undefined }, undefined>
 * // Y will be { key1: boolean }
 * ```
 *
 * We use this construct in the signature of the `http` function so that
 *
 * ```ts
 * http(
 *    'GET /simple/endpoint/without/params/and/body',
 *    { pathParams: {}, queryParams: {}, requestBody: {} },
 *    token
 * )
 * ```
 * becomes
 * ```ts
 * http(
 *    'GET /simple/endpoint/without/params/and/body',
 *    {},
 *    token
 * )
 * ```
 */
export type RemoveByValue<TObject, TPropertyValue> = Pick<
  TObject,
  {
    [Key in keyof TObject]-?: TObject[Key] extends TPropertyValue ? never : Key;
  }[keyof TObject]
>;

export async function assertSuccessfulResponse(
  response: Response
): Promise<Response> {
  if (!response.ok) {
    throw new Error("TODO: implement error handling");
  }
  return response;
}

function parseContent(response: Response) {
  if (response.headers.get("content-type")?.includes("application/json")) {
    return response.json();
  } else {
    return response.text();
  }
}

async function defaultResponseHandler(response: Response, endpoint: string) {
  await assertSuccessfulResponse(response);
  return await parseContent(response);
}

/**
 * A very light wrapper on top of `fetch` that makes it possible to
 * send HTTP requests.
 *
 * Example, make a simple GET request:
 *
 * ```ts
 * http('GET /rfqs/:rfqId/parts/mounting-types', { pathParams: { rfqId: 'xyz123' } }, token)
 * ```
 */
export async function http<T extends RegisteredHttpEndpoint>(
  endpoint: T,
  token: string
): Promise<z.infer<EndpointRegistry[T]["responseBody"]>> {
  const endpointDef = endpointRegistry[endpoint];

  const method = "GET";
  const url = "http://localhost:8080/artists";

  const headers = {};

  const response = await fetch(url, {
    method,
    headers,
  });

  const responseBody = await defaultResponseHandler(response, endpoint);

  assertResponseBodyShape({
    runtype: endpointDef.responseBody,
    responseBody,
  });

  return responseBody;
}