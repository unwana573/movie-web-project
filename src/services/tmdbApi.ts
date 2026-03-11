import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const tmdbApi = createApi({
    reducerPath: "tmdbApi" as const,
    baseQuery: fetchBaseQuery({
        baseUrl: "https://imdb236.p.rapidapi.com/api/imdb/cast/nm0000190/titles",
        prepareHeaders: (headers: Headers) => {
            headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPIDAPI_KEY as string);
            headers.set(
                "X-RapidAPI-Host",
                "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            );
            return headers;
        },
    }) as BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError>,
    endpoints: (builder) => ({
        getMovies: builder.query<unknown, void>({ query: () => "" }),
    }),
});