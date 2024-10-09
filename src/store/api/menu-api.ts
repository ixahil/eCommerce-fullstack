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

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL + "store/menus",
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomizedFetchBaseQueryError,
    object
  >,
  tagTypes: ["menus", "menu"],
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: ({ id }) => `/${id}`,
      transformErrorResponse: errorHandler,
      transformResponse: responseHandler,
      providesTags: ({ data }) => [
        data ? { type: "menu", id: data._id } : { type: "menu", id: 0 },
      ],
    }),
    getMenus: builder.query({
      query: () => "",
      transformResponse: responseHandler,
      transformErrorResponse: errorHandler,
      providesTags: ({ data }) =>
        data
          ? [
              ...data.map(({ _id }) => ({
                type: "menu" as const,
                id: _id,
              })),
              "menus",
            ]
          : ["menus"],
    }),
    addMenu: builder.mutation({
      query: ({ payload }) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
      transformResponse: responseHandler,
      transformErrorResponse: errorHandler,
      providesTags: ({ data }) => [
        data ? { type: "menu", id: data._id } : { type: "menu", id: 0 },
      ],
    }),
    updateMenu: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
      invalidatesTags: ({ data }) => [{ type: "menu", id: data._id }],
    }),

    deleteMenu: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: errorHandler,
      transformResponse: responseHandlerToast,
      invalidatesTags: ["menus"],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useUpdateMenuMutation,
  useAddMenuMutation,
  useDeleteMenuMutation,
  useGetMenuQuery,
} = menuApi;

export default menuApi;
