/** GET /artists */
export type GetArtistsDTO = {
  artist_name: string;
  artist_genre: string;
  albums_recorded: number;
  username: string;
};
