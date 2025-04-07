import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../api";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const data = await fetchProducts();
  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;