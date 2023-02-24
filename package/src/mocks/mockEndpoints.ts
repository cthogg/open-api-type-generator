import { z } from "zod";

const getArtistsEndpoint = {
  "GET /artists": {
    responseBody: z.object({
      artist_name: z.string(),
      artist_genre: z.string(),
      albums_recorded: z.number(),
      username: z.number(),
    }),
  },
};

export const endpointRegistry = {
  ...getArtistsEndpoint,
} as const;

export type EndpointRegistry = typeof endpointRegistry;
export type RegisteredHttpEndpoint = keyof typeof endpointRegistry;
