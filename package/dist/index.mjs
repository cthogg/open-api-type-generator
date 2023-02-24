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
var getAlbumsEndpoint2 = {
  "GET /album": {
    responseBody: z.object({
      album_name: z.string()
    })
  }
};
var endpoints = [getArtistsEndpoint, getAlbumsEndpoint];
var endpointRegistry = {
  ...getAlbumsEndpoint2
};

// src/out/endpoints.ts
var endpoints2 = endpoints;

// src/adapters/useHttpQuery/useHttpQuery.tsx
import { useQuery } from "react-query";

// src/adapters/useHttpQuery/http.ts
function assertResponseBodyShape({
  runtype,
  responseBody
}) {
  const isProductionEnvironment = () => false;
  try {
    if (!isProductionEnvironment()) {
      runtype.parse(responseBody);
    }
  } catch (runtypeError) {
    if (!isProductionEnvironment()) {
      const ourError = new Error("Response body did not match expected shape");
      throw ourError;
    }
  }
}
async function assertSuccessfulResponse(response, endpoint) {
  if (!response.ok) {
    const { status, statusText } = response;
    throw new Error("TODO: implement error handling");
  }
  return response;
}
function parseContent(response) {
  var _a;
  if ((_a = response.headers.get("content-type")) == null ? void 0 : _a.includes("application/json")) {
    return response.json();
  } else {
    return response.text();
  }
}
async function defaultResponseHandler(response, endpoint) {
  await assertSuccessfulResponse(response, endpoint);
  return await parseContent(response);
}
async function http(endpoint, options, token) {
  const unsafeOptions = options;
  const endpointDef = endpointRegistry[endpoint];
  const method = "GET";
  const url = "https://opentdb.com/api.php?amount=1";
  const requestBody = unsafeOptions.requestBody;
  const headers = options.headers ?? {};
  headers["Authorization"] = `Bearer ${token}`;
  if (requestBody) {
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(url, {
    method,
    headers,
    body: requestBody ? JSON.stringify(requestBody) : void 0
  });
  const responseBody = await defaultResponseHandler(response, endpoint);
  assertResponseBodyShape({
    runtype: endpointDef.responseBody,
    responseBody
  });
  return responseBody;
}

// src/adapters/useHttpQuery/useHttpQuery.tsx
function useHttpQuery(endpoint, options, useQueryOptions = {}, token) {
  return useQuery({
    queryKey: [endpoint, options],
    queryFn: async () => {
      return http(endpoint, options, token);
    },
    ...useQueryOptions
  });
}

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
  fetchers,
  useHttpQuery
};
