import { z } from 'zod';

type Endpoint = {
    endpoint: string;
    responseBody: z.ZodType;
};

declare const endpoints: Endpoint[];

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
