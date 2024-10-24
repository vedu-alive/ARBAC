import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react' 
const authenticationService = createApi({
  reducerPath: "authenticationService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  }),
  tagTypes: ["Authentication"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Authentication"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Authentication"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["Authentication"],
    }),
    oAuthLogin: builder.mutation({
      query: (credentials) => ({
        url: "oauth_login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useOAuthLoginMutation,
} = authenticationService;
    
export default authenticationService;