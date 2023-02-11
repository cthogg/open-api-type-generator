// src/mocks/mockEndpoints.ts
import { z } from "zod";
var getArtistsEndpoint = {
  endpoint: "GET /artists",
  responseBody: z.object({
    artist_name: z.string(),
    artist_genre: z.string(),
    albums_recorded: z.number(),
    username: z.string()
  })
};
var getAlbumsEndpoint = {
  endpoint: "GET /album",
  responseBody: z.object({
    album_name: z.string()
  })
};
var endpoints = [getArtistsEndpoint, getAlbumsEndpoint];

// src/out/endpoints.ts
var endpoints2 = endpoints;

// src/adapters/zodFetch/zodFetch.ts
import { createZodFetcher } from "zod-fetch";
var fetchWithZod = createZodFetcher();
var createZodFetcherFromEndpoint = (endpoint) => {
  const fetcherAsync = () => {
    return fetchWithZod(
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
var createZodFetchersFromEndpoints = (endpoints3) => {
  return endpoints3.map((endpoint) => createZodFetcherFromEndpoint(endpoint));
};

// src/out/zodFetchers.ts
var fetchers = createZodFetchersFromEndpoints(endpoints2);
export {
  endpoints2 as endpoints,
  fetchers
};
