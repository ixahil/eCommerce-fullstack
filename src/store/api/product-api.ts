import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL, errorHandler, responseHandler } from "../utils";
import { setProducts } from "../slice/product-slice";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL + "products" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "",
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
      //   onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      //     try {
      //       const { data } = await queryFulfilled;
      //       dispatch(setProducts(data));
      //     } catch (error) {}
      //   },
    }),
    addProduct: builder.mutation({
      query: ({ payload }) => ({
        url: "",
        method: "POST",
        body: payload,
        transformErrorResponse: errorHandler,
        transformResponse: responseHandler,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "PUT",
        body: payload,
        transformErrorResponse: errorHandler,
        transformResponse: responseHandler,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation,
} = productApi;

export default productApi;
