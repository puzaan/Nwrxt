import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from './baseUrl';

export const houseServiceApi = createApi({
  reducerPath: 'houseServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['houseService'],
  endpoints: (builder) => ({
    getAllHouseService: builder.query({
      query: () => ({
        url: '/house/service/list'
      }),
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
        body: query.body,
        method: 'POST'
      }),
      invalidatesTages: ['houseService']
    }),
    deleteHouseServiceByid: builder.mutation({
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

export const { useDeleteHouseServiceById, useCreateHouseService, useGetHouseServiceById, useGetAllHouseServices } = houseServiceApi;
