import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const rapidApiKey = import.meta.env.VITE_RAPID_KEY;

export const textApi = createApi({
    reducerPath: 'textApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTranslation: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.url)}&length=3&lang=${params.lang}`
        })
    })
});

export const { useLazyGetTranslationQuery } = textApi;