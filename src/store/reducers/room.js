import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from './baseUrl';

export const roomServiceApi = createApi({
  reducerPath: 'roomServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['room'],
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => '/room/list',
      providesTags: ['room']
    }),

    getRoomById: builder.query({
      query: (query) => ({
        url: `/room/${query}`
      }),
      providesTags: ['room']
    }),
    createRoom: builder.mutation({
      query: (query) => ({
        url: '/room/save',
        method: 'POST',
        body: query.body
      }),
      invalidatesTages: ['room']
    }),
    deleteRoomById: builder.mutation({
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

export const { useUpdateRoomByIdMutation, useDeleteRoomByIdMutation, useCreateRoomMutation, useGetRoomByIdQuery, useGetAllRoomsQuery } =
  roomServiceApi;
