import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "https://backend-production-9647.up.railway.app/users/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "https://backend-production-9647.up.railway.app/users/register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "https://backend-production-9647.up.railway.app/users/logout",
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: "https://backend-production-9647.up.railway.app/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "https://backend-production-9647.up.railway.app/users",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `https://backend-production-9647.up.railway.app/users/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetUserDetailsQuery,
} = userApiSlice;
