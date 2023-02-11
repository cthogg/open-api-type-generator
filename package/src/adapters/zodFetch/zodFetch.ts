import { createZodFetcher } from "zod-fetch";
import { Endpoint } from "../../lexer/types";

const fetchWithZod = createZodFetcher();

export type Fetcher = {
  endpoint: string;
  fetcherAsync: () => Promise<any>;
  fetcherResolved: () => Promise<any>;
};

const createZodFetcherFromEndpoint = (endpoint: Endpoint): Fetcher => {
  const fetcherAsync = () => {
    return fetchWithZod<typeof endpoint.responseBody>(
      // The schema you want to validate with
      endpoint.responseBody,
      // Any parameters you would usually pass to fetch
      endpoint.endpoint
    );
  };
  const fetcherResolved = async () => {
    return fetcherAsync().then((res) => res);
  };
  return { endpoint: endpoint.endpoint, fetcherAsync, fetcherResolved };
};

export const createZodFetchersFromEndpoints = (
  endpoints: Endpoint[]
): Fetcher[] => {
  return endpoints.map((endpoint) => createZodFetcherFromEndpoint(endpoint));
};
