import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAnalytics: builder.query({
      query: () => ({
        url: "/analytics/get-courses-analytics",
        credentials: "include" as const,
        method: "GET",
      }),
    }),
    getOrdersAnalytics: builder.query({
      query: () => ({
        url: "/analytics/get-orders-analytics",
        credentials: "include" as const,
        method: "GET",
      }),
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: "/analytics/get-users-analytics",
        credentials: "include" as const,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCoursesAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} = analyticsApi;
