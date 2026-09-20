import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalQuantity = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const selectCartTotalPrice = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
);
