import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const administrationService = createApi({
  reducerPath: "administration",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["administration"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["administration"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "add-users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["administration"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["administration"],
    }),
    deleteUser: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["administration"],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = administrationService;
export default administrationService;
