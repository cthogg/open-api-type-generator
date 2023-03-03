import { z } from "zod";

const getArtistsEndpoint = {
  "GET /artists": {
    responseBody: z.object({
      artist_name: z.string(),
      artist_genre: z.string(),
      albums_recorded: z.number(),
      username: z.string(),
    }),
  },
};

export const endpointRegistry = {
  ...getArtistsEndpoint,
} as const;