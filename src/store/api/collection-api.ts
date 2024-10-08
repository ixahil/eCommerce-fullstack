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
  tagTypes: ["collections", "collection"],
  endpoints: (builder) => ({
    getCollection: builder.query({
      query: ({ id }) => `/${id}`,
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
      providesTags: ({ data }) => [
        data
          ? { type: "collection", id: data._id }
          : { type: "collection", id: 0 },
      ],
    }),
    getCollections: builder.query({
      query: () => "",
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
      providesTags: ({ data }) =>
        data
          ? [
              ...data.map(({ _id }) => ({
                type: "collection" as const,
                id: _id,
              })),
              "collections",
            ]
          : ["collections"],
    }),
    addCollection: builder.mutation({
      query: ({ payload }) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
      transformResponse: responseHandlerToast,
      transformErrorResponse: errorHandler,
      providesTags: ({ data }) => [
        data
          ? { type: "collection", id: data._id }
          : { type: "collection", id: 0 },
      ],
    }),
    updateCollection: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
      invalidatesTags: ({ data }) => [{ type: "collection", id: data._id }],
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
