import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "/user/update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ name }) => ({
        url: "/user/update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
      invalidatesTags: ["updateProfile"],
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "/user/update-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
      invalidatesTags: ["updatePassword"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
} = userApi;
