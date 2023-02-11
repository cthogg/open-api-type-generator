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

export const endpoints: [typeof getArtistsEndpoint, typeof getAlbumsEndpoint] =
  [getArtistsEndpoint, getAlbumsEndpoint];
