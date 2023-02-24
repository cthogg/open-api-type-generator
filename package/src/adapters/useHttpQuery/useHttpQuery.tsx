import { useQuery } from "react-query";
import { UseQueryOptions, UseQueryResult } from "react-query/types/react/types";
import { z } from "zod";
import {
  EndpointRegistry,
  RegisteredHttpEndpoint,
} from "../../mocks/mockEndpoints";
import { http } from "./http";
// import * as r from "runtypes";

/**
 * `useQuery` adapted for making type-safe HTTP requests
 */
export function useHttpQuery<
  T extends RegisteredHttpEndpoint,
  TData = z.infer<EndpointRegistry[T]["responseBody"]>
>(
  endpoint: T,
  useQueryOptions: UseQueryOptions<
    z.infer<EndpointRegistry[T]["responseBody"]>,
    unknown,
    TData
  > = {},
  token: string
): UseQueryResult<TData, unknown> {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      return http(endpoint, token);
    },
    ...useQueryOptions,
  });
}
