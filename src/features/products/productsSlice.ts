import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './types';
import { fetchProductsFromApi } from './mockApi';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ProductsState {
  items: Product[];
  status: RequestStatus;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

/**
 * Lấy danh sách sản phẩm từ API giả lập.
 * Đây là cách tiếp cận "cổ điển" dùng createAsyncThunk theo yêu cầu đề bài.
 * (Bản dùng thực tế trong UI là RTK Query, xem features/products/productsApi.ts)
 */
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const products = await fetchProductsFromApi();
    return products;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Không thể tải danh sách sản phẩm';
      });
  },
});

export default productsSlice.reducer;
