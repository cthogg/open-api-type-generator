import * as zod from 'zod';

declare const endpoints: [{
    readonly endpoint: "GET /artists";
    readonly responseBody: zod.ZodObject<{
        artist_name: zod.ZodString;
        artist_genre: zod.ZodString;
        albums_recorded: zod.ZodNumber;
        username: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        artist_name?: string;
        artist_genre?: string;
        albums_recorded?: number;
        username?: string;
    }, {
        artist_name?: string;
        artist_genre?: string;
        albums_recorded?: number;
        username?: string;
    }>;
}, {
    readonly endpoint: "GET /album";
    readonly responseBody: zod.ZodObject<{
        album_name: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        album_name?: string;
    }, {
        album_name?: string;
    }>;
}];

/** GET /artists */
type GetArtistsDTO = {
    artist_name: string;
    artist_genre: string;
    albums_recorded: number;
    username: string;
};

type Fetcher = {
    endpoint: string;
    fetcherAsync: () => Promise<any>;
    fetcherResolved: () => Promise<any>;
};

declare const fetchers: Fetcher[];

export { GetArtistsDTO, endpoints, fetchers };
