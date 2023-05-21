import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../services/apiUrl";

export const testApi = createApi({
  reducerPath: "testApi",
  tagTypes: ["Tests"],

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/test`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    getTests: build.query({
      query: (category) => `${category}`,
      providesTags: ["Tests"],
    }),

    addTest: build.mutation({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tests"],
    }),

    deleteTest: build.mutation({
      query: (testId) => ({
        url: `/${testId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tests"],
    }),
  }),
});

export const { useGetTestsQuery, useAddTestMutation, useDeleteTestMutation } =
  testApi;

export default testApi;
