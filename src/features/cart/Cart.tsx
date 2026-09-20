import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCart } from './cartSlice';
import { CartItemRow } from './CartItemRow';
import { selectCartItems, selectCartTotalPrice, selectCartTotalQuantity } from './selectors';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  if (items.length === 0) {
    return (
      <div className="cart">
        <h2>Giỏ hàng</h2>
        <p className="status-message">Giỏ hàng đang trống.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Giỏ hàng ({totalQuantity})</h2>
        <button onClick={() => dispatch(clearCart())}>Xoá tất cả</button>
      </div>

      <ul className="cart-list">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </ul>

      <div className="cart-total">
        <span>Tổng cộng</span>
        <strong>{currencyFormatter.format(totalPrice)}</strong>
      </div>
    </div>
  );
}
