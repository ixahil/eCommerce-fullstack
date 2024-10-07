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
import { CustomizedFetchBaseQueryError } from "./product-api";

// type GetCollections = {
//   statusCode: number;
//   data: Collection[];
//   message?: string;
//   status: "success" | "error";
// };

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL + "collections",
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomizedFetchBaseQueryError,
    object
  >,
  tagTypes: ["collections"],
  endpoints: (builder) => ({
    getCollection: builder.query({
      query: ({ id }) => `/${id}`,
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
    }),
    getCollections: builder.query({
      query: () => "",
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
      providesTags: ["collections"],
    }),
    addCollection: builder.mutation({
      query: ({ payload }) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
      transformResponse: responseHandlerToast,
      transformErrorResponse: errorHandler,
      invalidatesTags: ["collections"],
    }),
    updateCollection: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
      invalidatesTags: ["collections"],
    }),
    deleteCollection: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
      invalidatesTags: ["collections"],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useAddCollectionMutation,
  useUpdateCollectionMutation,
  useGetCollectionQuery,
  useDeleteCollectionMutation,
} = collectionApi;

export default collectionApi;
