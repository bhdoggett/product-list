import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsResponse, QueryType } from "./productTypes";

//This returns an object with two properties: currentPage and totalProductCount
export const fetchProducts = createAsyncThunk<ProductsResponse, string>(
  "products/fetchProducts",
  async (queryString) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${queryString}`
    );
    return response.data;
  }
);

type ProductSliceState = {
  query: QueryType;
  loading: boolean;
  error: string | null;
  products: { currentPage: Product[]; totalPages: number } | null;
};

const initialState: ProductSliceState = {
  query: {
    search: null,
    category: null,
    price: null,
    page: 1,
    string: null,
  },
  loading: false,
  error: null,
  products: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string | null>) => {
      state.query.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.query.category = action.payload;
    },
    setSortPrice: (state, action: PayloadAction<string | null>) => {
      state.query.price = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.query.page = action.payload;
    },
    updateQueryString: (state) => {
      const { search, category, price, page } = state.query;
      const queryParts = [];
      if (search) {
        queryParts.push(`search=${search}`);
      }
      if (category) {
        queryParts.push(`category=${category}`);
      }
      if (price) {
        queryParts.push(`price=${price}`);
      }
      if (page) {
        queryParts.push(`page=${page}`);
      }
      state.query.string = queryParts.join("&");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occured";
      });
  },
});

export const {
  setSearch,
  setCategory,
  setSortPrice,
  setPage,
  updateQueryString,
} = productsSlice.actions;
export default productsSlice.reducer;
