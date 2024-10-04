import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL, errorHandler, responseHandler } from "../utils";
import { setProducts } from "../slice/product-slice";
import { Collection } from "@/types/product";

type Prop = {
  data: Collection[];
};

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL + "collections" }),
  endpoints: (builder) => ({
    getCollections: builder.query<Prop, void>({
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
  useGetCollectionsQuery,
  useUpdateProductMutation,
  useAddProductMutation,
} = collectionApi;

export default collectionApi;
