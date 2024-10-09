import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  baseURL,
  errorHandler,
  responseHandler,
  responseHandlerToast,
} from "../utils";

export type CustomizedFetchBaseQueryError = {
  data: {
    data: null;
    isOperational: boolean;
    errors: [];
    message: string;
    statusCode: number;
    success: string;
  };
  status: number;
  error?: unknown;
};

export const siteConfig = createApi({
  reducerPath: "siteConfig",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL + "store/store-config",
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomizedFetchBaseQueryError,
    object
  >,
  // tagTypes: ["menus", "menu"],
  endpoints: (builder) => ({
    getSiteConfig: builder.query({
      query: () => "",
      transformResponse: responseHandler,
      transformErrorResponse: errorHandler,
    }),
    updateStoreConfig: builder.mutation({
      query: ({ payload }) => ({
        url: `/update`,
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
    }),
  }),
});

export const { useUpdateStoreConfigMutation, useGetSiteConfigQuery } =
  siteConfig;

export default siteConfig;
