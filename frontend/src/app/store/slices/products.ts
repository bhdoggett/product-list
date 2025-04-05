import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (baseUrl, query) => {
    const response = await axios.get(`${baseUrl}/products?${query}`);
    return response.data;
  }
);

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

type ProductSliceState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  products: Product[];
};

const initialState: ProductSliceState = {
  status: "idle",
  error: null,
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occured";
      });
  },
});

export default productsSlice.reducer;
