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

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL + "brands" }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomizedFetchBaseQueryError,
    object
  >,
  tagTypes: ["brands", "brand"],
  endpoints: (builder) => ({
    getBrand: builder.query({
      query: ({ id }) => `/${id}`,
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
      providesTags: ({ data }) => [
        data ? { type: "brand", id: data._id } : { type: "brand", id: 0 },
      ],
    }),
    getBrands: builder.query({
      query: () => "",
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
      providesTags: ({ data }) =>
        data
          ? [
              ...data.map(({ _id }) => ({ type: "brand" as const, id: _id })),
              "brands",
            ]
          : ["brands"],
    }),
    addBrand: builder.mutation({
      query: ({ payload }) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
      transformResponse: responseHandlerToast,
      transformErrorResponse: errorHandler,
      providesTags: ({ data }) => [
        data ? { type: "brand", id: data._id } : { type: "brand", id: 0 },
      ],
    }),
    updateBrand: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
      invalidatesTags: ({ data }) => [{ type: "brand", id: data._id }],
    }),
    deleteBrand: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
      invalidatesTags: ["brands"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;

export default brandApi;
