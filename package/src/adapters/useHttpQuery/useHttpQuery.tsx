import { useQuery } from "react-query";
import { UseQueryOptions, UseQueryResult } from "react-query/types/react/types";
import { z } from "zod";
import {
  EndpointRegistry,
  RegisteredHttpEndpoint,
} from "../../mocks/mockEndpoints";
import { http } from "./http";

// export function useDebugErrorHandler(): (error: unknown) => void {
//   const showDebugErrorMessage = useShowDebugErrorMessage();
//   const { enqueueSnackbar } = useSnackbar();

//   return (error: unknown) => {
//       const { known, message } = composeErrorMessage(error);
//       if (error instanceof Error && !known) {
//           logToExternalErrorHandlers(error);
//       }
//       if (isProductionEnvironment() || known) {
//           enqueueSnackbar(message);
//       } else {
//           showDebugErrorMessage(error);
//       }
//   };
// }

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
      return http(endpoint);
    },
    onError: (e) => {
      console.error(e);
    },
    ...useQueryOptions,
  });
}
