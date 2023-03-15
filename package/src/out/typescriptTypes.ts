//AUTOGENERATED FILE - DO NOT EDIT MANUALLY

import * as rt from "runtypes";

const getArtistsDTO = rt.Record({
  artist_name: rt.String,
  artist_genre: rt.String,
  albums_recorded: rt.Number,
  username: rt.String,
});

type GetArtistsDTO = rt.Static<typeof getArtistsDTO>;

export { GetArtistsDTO };

export const endpointRegistry = { ...getArtistsDTO } as const;
