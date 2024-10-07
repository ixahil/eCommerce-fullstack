import { Product } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
  data?: Product[];
}

const initialState = {
  data: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log(action.payload.products);
      state.data = action.payload.products;
    },
  },
});

export const { setProducts } = productSlice.actions;

export const selectProducts = (state: { product: ProductState }) =>
  state.product;

export default productSlice;
