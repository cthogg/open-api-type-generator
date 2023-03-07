import * as rt from "runtypes";

const getArtistsEndpoint = {
  "GET /artists": {
    responseBody: rt.Record({
      artist_name: rt.String,
      artist_genre: rt.String,
      albums_recorded: rt.Number,
      username: rt.String,
    }),
  },
};

export const endpointRegistry = {
  ...getArtistsEndpoint,
} as const;
