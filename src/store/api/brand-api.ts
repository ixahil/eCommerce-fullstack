import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL, errorHandler, responseHandler } from "../utils";
import { Brand } from "@/types/product";

type Prop = {
  data: Brand[];
};

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL + "brands" }),
  endpoints: (builder) => ({
    getBrands: builder.query<Prop, void>({
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
  }),
});

export const { useGetBrandsQuery } = brandApi;

export default brandApi;
