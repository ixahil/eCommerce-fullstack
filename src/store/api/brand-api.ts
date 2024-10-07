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
  tagTypes: ["brands"],
  endpoints: (builder) => ({
    getBrand: builder.query({
      query: ({ id }) => `/${id}`,
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
    }),
    getBrands: builder.query({
      query: () => "",
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
      providesTags: ["brands"],
    }),
    addBrand: builder.mutation({
      query: ({ payload }) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
      transformResponse: responseHandlerToast,
      transformErrorResponse: errorHandler,
      invalidatesTags: ["brands"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
      invalidatesTags: ["brands"],
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
