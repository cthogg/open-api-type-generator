import { z } from "zod";

const getArtistsEndpoint = {
  endpoint: "GET /artists",
  responseBody: z.object({
    artist_name: z.string(),
    artist_genre: z.string(),
    albums_recorded: z.number(),
    username: z.string(),
  }),
} as const;

const getAlbumsEndpoint = {
  endpoint: "GET /album",
  responseBody: z.object({
    album_name: z.string(),
  }),
} as const;

const getAlbumsEndpoint2 = {
  "GET /artists": {
    responseBody: z.object({
      artist_name: z.string(),
      artist_genre: z.string(),
      albums_recorded: z.number(),
      username: z.number(),
    }),
  },
};

export const endpoints: [typeof getArtistsEndpoint, typeof getAlbumsEndpoint] =
  [getArtistsEndpoint, getAlbumsEndpoint];

export const endpointRegistry = {
  ...getAlbumsEndpoint2,
} as const;

export type EndpointRegistry = typeof endpointRegistry;
export type RegisteredHttpEndpoint = keyof typeof endpointRegistry;
