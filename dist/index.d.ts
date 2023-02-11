/** GET /artists */
type GetArtistsDTO = {
    artist_name: string;
    artist_genre: string;
    albums_recorded: number;
    username: string;
};

export { GetArtistsDTO };
