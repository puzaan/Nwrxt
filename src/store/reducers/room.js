import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from './baseUrl';

export const roomServiceApi = createApi({
  reducerPath: 'roomServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['room'],
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => ({
        url: '/room/list'
      }),
      providesTags: ['room']
    }),
    getRoomById: builder.query({
      query: (query) => ({
        url: `/room/${query.id}`
      }),
      providesTags: ['room']
    }),
    createRoom: builder.mutation({
      query: (query) => ({
        url: '/room/save',
        body: query.body,
        method: 'POST'
      }),
      invalidatesTages: ['order']
    }),
    deleteRoomByid: builder.mutation({
      query: (query) => ({
        url: `/room/${query.id}`,
        method: 'DELETE'
      }),
      invalidatesTages: ['room']
    }),
    updateRoomById: builder.mutation({
      query: (query) => ({
        url: `/room/update`,
        method: 'PUT',
        body: query.body
      }),
      invalidatesTages: ['room']
    })
  })
});

export const { useDeleteRoomById, useCreateRoom, useGetRoomById, useGetAllRooms } = roomServiceApi;
