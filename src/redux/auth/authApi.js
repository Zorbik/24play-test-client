import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../services/apiUrl";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (user) => ({
        url: `signup`,
        method: "POST",
        body: user,
        providesTags: ["Auth"],
      }),
    }),

    logInUser: build.mutation({
      query: (user) => ({
        url: `login`,
        method: "POST",
        body: { email: user.email, password: user.password },
      }),
      providesTags: ["Auth"],
    }),

    logOutUser: build.mutation({
      query: () => ({
        url: `logout`,
      }),
      providesTags: ["Auth"],
    }),

    updateUser: build.mutation({
      query: ({ userId, statistic }) => ({
        url: `/${userId}`,
        method: "PATCH",
        body: statistic,
      }),
      invalidatesTags: ["Auth"],
    }),

    getStatistic: build.query({
      query: () => "statistic",
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLogInUserMutation,
  useLogOutUserMutation,
  useUpdateUserMutation,
  useGetStatisticQuery,
} = authApi;
