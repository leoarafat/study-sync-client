import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type: any) => ({
        url: `/layout/get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editLayouts: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/layout/update-layout/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: "/layout/update-layout",
        method: "PUT",
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useEditLayoutsMutation,
  useGetHeroDataQuery,
  useEditLayoutMutation,
} = courseApi;
