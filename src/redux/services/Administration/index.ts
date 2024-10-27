import { globalConstants } from "@/constants/enums";
import { resetToken } from "@/redux/slices/authentication";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders(headers) {
    const token = localStorage.getItem(globalConstants.token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions = {}
) => {
  //* make the original request
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status===401 || result?.error?.status === 403) {
    //* getting refresh token if the access token is expired
    const refreshResult = await baseQuery(
      { url: "refresh_token", method: "POST" },
      api,
      extraOptions
    );
    console.log(refreshResult,"refreshResult");
    
    if (refreshResult.data) {
      typeof refreshResult.data === "object" &&
        "token" in refreshResult.data &&
        localStorage.setItem(
          globalConstants.token,
          refreshResult.data.token as string
        );
    } else {
      //* logging out the user if the refresh token is expired
      api.dispatch(resetToken());
    }
    //* retry the original request
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

const administrationService = createApi({
  reducerPath: "administration",
  baseQuery: baseQueryWithReauth,
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

export const { useGetUsersQuery, useCreateUserMutation } =
  administrationService;
export default administrationService;
