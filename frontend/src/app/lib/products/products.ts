import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { truncate } from "fs";

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
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

type QueryType = {
  search: string | null;
  category: string | null;
  price: string | null;
  page: number;
  string: string;
};

type ProductSliceState = {
  query: QueryType;
  loading: boolean;
  error: string | null;
  products: Product[];
};

const initialState: ProductSliceState = {
  query: {
    search: "",
    category: "",
    price: "",
    page: 1,
    string: "",
  },
  loading: false,
  error: null,
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.query.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.query.category = action.payload;
    },
    setSortPrice: (state, action: PayloadAction<string>) => {
      state.query.price = action.payload;
    },
    updateQueryString: (state) => {
      const { search, category, sortPrice, page } = state.query;
      const queryParts = [];
      if (search) {
        queryParts.push(`search=${search}`);
      }
      if (category) {
        queryParts.push(`category=${category}`);
      }
      if (sortPrice) {
        queryParts.push(`sortPrice=${sortPrice}`);
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

export const { setSearch, setCategory, setSortPrice, updateQueryString } =
  productsSlice.actions;
export default productsSlice.reducer;
