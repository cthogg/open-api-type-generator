import { z } from "zod";

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

export const endpoints: [typeof getAlbumsEndpoint2] = [getAlbumsEndpoint2];

export const endpointRegistry = {
  ...getAlbumsEndpoint2,
} as const;

export type EndpointRegistry = typeof endpointRegistry;
export type RegisteredHttpEndpoint = keyof typeof endpointRegistry;
