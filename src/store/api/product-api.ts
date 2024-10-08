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

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL + "products" }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomizedFetchBaseQueryError,
    object
  >,
  tagTypes: ["products", "product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/${id}`,
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
      providesTags: ({ data }) => [
        data ? { type: "product", id: data._id } : { type: "product", id: 0 },
      ],
    }),
    getProducts: builder.query({
      query: () => "",
      transformResponse: responseHandler,
      transformErrorResponse: errorHandler,
      providesTags: ({ data }) =>
        data
          ? [
              ...data.map(({ _id }) => ({
                type: "product" as const,
                id: _id,
              })),
              "products",
            ]
          : ["products"],
    }),
    addProduct: builder.mutation({
      query: ({ payload }) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
      transformResponse: responseHandler,
      transformErrorResponse: errorHandler,
      providesTags: ({ data }) => [
        data ? { type: "product", id: data._id } : { type: "product", id: 0 },
      ],
    }),
    updateProduct: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
      invalidatesTags: ({ data }) => [{ type: "product", id: data._id }],
    }),

    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
} = productApi;

export default productApi;
