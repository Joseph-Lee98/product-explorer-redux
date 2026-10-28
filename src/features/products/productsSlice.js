import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products?limit=30");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || "Something went wrong";
      });
  },
});

export default productsSlice.reducer;
