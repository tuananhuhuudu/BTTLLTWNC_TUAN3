# BTTLLTWNC_TUAN3

Bài tập tuần 3: xây dựng module giỏ hàng bằng Redux Toolkit (React + TypeScript + Vite).

## Yêu cầu đề bài

- Xây dựng module giỏ hàng hoàn chỉnh bằng Redux Toolkit gồm `cartSlice` và `productsSlice`
- `productsSlice` dùng `createAsyncThunk` lấy danh sách sản phẩm từ API giả lập
- Thử thêm RTK Query để lấy điểm cộng
- `cartSlice` hỗ trợ thêm, xoá, cập nhật số lượng sản phẩm trong giỏ
- Toàn bộ component chỉ dùng `useAppDispatch`/`useAppSelector` đã gõ kiểu
- Tổ chức thư mục theo chuẩn feature-based

## Cấu trúc thư mục

```
src/
  app/
    store.ts       # cấu hình store, gộp reducer + middleware của RTK Query
    hooks.ts        # useAppDispatch, useAppSelector đã gõ kiểu
  features/
    cart/
      cartSlice.ts     # add/remove/update quantity/clear
      selectors.ts     # tổng số lượng, tổng tiền (memoized)
      Cart.tsx
      CartItemRow.tsx
      types.ts
    products/
      productsSlice.ts # bản dùng createAsyncThunk (đúng yêu cầu đề bài)
      productsApi.ts   # bản dùng RTK Query (làm thêm để lấy điểm cộng)
      mockApi.ts       # API giả lập, trả data sau 1 khoảng delay
      ProductList.tsx
      types.ts
  App.tsx
  main.tsx
```

## Ghi chú

- `productsSlice.ts` viết đầy đủ bằng `createAsyncThunk` theo đúng yêu cầu, nhưng UI thực tế đang dùng `productsApi.ts` (RTK Query) vì gọn hơn và có cache sẵn — cả hai đều gọi chung `mockApi.ts` nên có thể so sánh 2 cách viết ngay trong code.
- Ảnh sản phẩm là SVG placeholder sinh trực tiếp trong code (không gọi ảnh từ internet) để chạy được cả khi offline.

## Chạy thử

```bash
npm install
npm run dev
```

Kiểm tra nhanh:

```bash
npm run lint
npx tsc -b
npm run build
```
