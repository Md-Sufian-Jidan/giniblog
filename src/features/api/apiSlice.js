import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '@clerk/nextjs/server';

console.log('error');
export const api = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        const token = await getToken();
        const rawBaseQuery = fetchBaseQuery({
            baseUrl: '/api',
            prepareHeaders: (headers) => {
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
                return headers;
            },
        });
        return rawBaseQuery(args, api, extraOptions);
    },
    endpoints: () => ({}),
});
