import { createSlice } from "@reduxjs/toolkit";

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

export const selectProducts = (state) => state.data;

export default productSlice;
