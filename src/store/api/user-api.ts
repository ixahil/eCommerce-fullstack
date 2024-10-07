import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL, errorHandler, responseHandler } from "../utils";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL + "users/" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "",
      transformResponse: responseHandler,
      transformErrorResponse: errorHandler,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
