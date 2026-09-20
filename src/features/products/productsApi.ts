import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from './types';
import { fetchProductsFromApi } from './mockApi';

/**
 * RTK Query "bonus" implementation. Dùng fakeBaseQuery vì API là hàm giả lập
 * (không phải endpoint HTTP thật), nhưng vẫn có đầy đủ cache/loading/error của RTK Query.
 */
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fakeBaseQuery<string>(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      async queryFn() {
        try {
          const products = await fetchProductsFromApi();
          return { data: products };
        } catch {
          return { error: 'Không thể tải danh sách sản phẩm' };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product' as const, id: 'LIST' },
            ]
          : [{ type: 'Product' as const, id: 'LIST' }],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
