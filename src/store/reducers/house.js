import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from './baseUrl';

export const houseServiceApi = createApi({
  reducerPath: 'houseServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['houseService'],
  endpoints: (builder) => ({
    getAllHouseServices: builder.query({
      query: () => '/house/service/list',
      providesTags: ['houseService']
    }),
    getHouseServiceById: builder.query({
      query: (query) => ({
        url: `/house/service/${query.id}`
      }),
      providesTags: ['houseService']
    }),
    createHouseService: builder.mutation({
      query: (query) => ({
        url: '/house/service/save',
        method: 'POST',
        body: query.body
      }),
      invalidatesTages: ['houseService']
    }),
    deleteHouseServiceById: builder.mutation({
      query: (query) => ({
        url: `/house/service/${query.id}`,
        method: 'DELETE'
      }),
      invalidatesTages: ['houseService']
    }),
    updateHouseServiceById: builder.mutation({
      query: (query) => ({
        url: `/house/service/update`,
        method: 'PUT',
        body: query.body
      }),
      invalidatesTages: ['houseService']
    })
  })
});

export const {
  useDeleteHouseServiceByIdMutation,
  useUpdateHouseServiceByIdMutation,
  useCreateHouseServiceMutation,
  useGetHouseServiceByIdQuery,
  useGetAllHouseServicesQuery
} = houseServiceApi;
