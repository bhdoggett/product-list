import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//creatAsyncThunk with type
export const fetchProducts = createAsyncThunk<Product[], string>(
  "products/fetchProducts",
  async (url) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${url}`
    );
    return response.data;
  }
);

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

type QueryType = {
  search: string | null;
  category: string | null;
  page: number;
};

type ProductSliceState = {
  query: QueryType;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  products: Product[];
};

const initialState: ProductSliceState = {
  query: {
    search: "",
    category: "",
    page: 1,
  },
  status: "idle",
  error: null,
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.query = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
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
