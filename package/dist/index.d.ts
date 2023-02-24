import * as zod from 'zod';
import { z } from 'zod';
import { UseQueryOptions, UseQueryResult } from 'react-query/types/react/types';

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

declare const endpointRegistry: {
    readonly "GET /album": {
        responseBody: z.ZodObject<{
            album_name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            album_name?: string;
        }, {
            album_name?: string;
        }>;
    };
};

type EndpointRegistry = typeof endpointRegistry;
type RegisteredHttpEndpoint = keyof typeof endpointRegistry;
type ExtractArguments<T extends RegisteredHttpEndpoint> = {
    requestBody: z.infer<EndpointRegistry[T]["responseBody"]>;
};
/**
 * Removes all properties from type `TObject` whose values are of type `TPropertyValue`.
 *
 * Examples (see unit tests for more examples):
 *
 * ```ts
 * type X = RemoveByValue<{ a: number, b: string, c: string}, number>
 * // X will be { b: string, c: string }
 *
 * type Y = RemoveByValue<{ key1: boolean, key2: undefined }, undefined>
 * // Y will be { key1: boolean }
 * ```
 *
 * We use this construct in the signature of the `http` function so that
 *
 * ```ts
 * http(
 *    'GET /simple/endpoint/without/params/and/body',
 *    { pathParams: {}, queryParams: {}, requestBody: {} },
 *    token
 * )
 * ```
 * becomes
 * ```ts
 * http(
 *    'GET /simple/endpoint/without/params/and/body',
 *    {},
 *    token
 * )
 * ```
 */
type RemoveByValue<TObject, TPropertyValue> = Pick<TObject, {
    [Key in keyof TObject]-?: TObject[Key] extends TPropertyValue ? never : Key;
}[keyof TObject]>;

/**
 * `useQuery` adapted for making type-safe HTTP requests
 */
declare function useHttpQuery<T extends RegisteredHttpEndpoint, TData = z.infer<EndpointRegistry[T]["responseBody"]>>(endpoint: T, options: RemoveByValue<ExtractArguments<T>, undefined>, useQueryOptions: UseQueryOptions<z.infer<EndpointRegistry[T]["responseBody"]>, unknown, TData>, token: string): UseQueryResult<TData, unknown>;

type Fetcher = {
    endpoint: string;
    fetcherAsync: () => Promise<any>;
    fetcherResolved: () => Promise<any>;
};

declare const fetchers: Fetcher[];

export { GetArtistsDTO, endpoints, fetchers, useHttpQuery };
