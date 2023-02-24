var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  endpoints: () => endpoints2,
  fetchers: () => fetchers,
  useHttpQuery: () => useHttpQuery
});
module.exports = __toCommonJS(src_exports);

// src/mocks/mockEndpoints.ts
var import_zod = require("zod");
var getArtistsEndpoint = {
  endpoint: "GET /artists",
  responseBody: import_zod.z.object({
    artist_name: import_zod.z.string(),
    artist_genre: import_zod.z.string(),
    albums_recorded: import_zod.z.number(),
    username: import_zod.z.string()
  })
};
var getAlbumsEndpoint = {
  endpoint: "GET /album",
  responseBody: import_zod.z.object({
    album_name: import_zod.z.string()
  })
};
var getAlbumsEndpoint2 = {
  "GET /album": {
    responseBody: import_zod.z.object({
      album_name: import_zod.z.string()
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
var import_react_query = require("react-query");

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
  return (0, import_react_query.useQuery)({
    queryKey: [endpoint, options],
    queryFn: async () => {
      return http(endpoint, options, token);
    },
    ...useQueryOptions
  });
}

// src/adapters/zodFetch/zodFetch.ts
var import_zod_fetch = require("zod-fetch");
var fetchWithZod = (0, import_zod_fetch.createZodFetcher)();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  endpoints,
  fetchers,
  useHttpQuery
});
