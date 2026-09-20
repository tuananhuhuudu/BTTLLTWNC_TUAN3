import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from './types';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export type AddToCartPayload = Omit<CartItem, 'quantity'> & { quantity?: number };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { quantity = 1, ...product } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }

      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    incrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) return;

      if (item.quantity <= 1) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      } else {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
