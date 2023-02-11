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
  fetchers: () => fetchers
});
module.exports = __toCommonJS(src_exports);

// src/mocks/mockEndpoints.ts
var import_zod = require("zod");
var endpoints = [
  {
    endpoint: "GET /artists",
    responseBody: import_zod.z.object({
      artist_name: import_zod.z.string(),
      artist_genre: import_zod.z.string(),
      albums_recorded: import_zod.z.number(),
      username: import_zod.z.string()
    })
  }
];

// src/out/endpoints.ts
var endpoints2 = endpoints;

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
  fetchers
});
