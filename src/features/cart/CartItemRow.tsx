import { useAppDispatch } from '../../app/hooks';
import { decrementQuantity, incrementQuantity, removeFromCart, updateQuantity } from './cartSlice';
import type { CartItem } from './types';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value)) return;
    dispatch(updateQuantity({ id: item.id, quantity: value }));
  };

  return (
    <li className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p>{currencyFormatter.format(item.price)}</p>
      </div>

      <div className="cart-item-quantity">
        <button onClick={() => dispatch(decrementQuantity({ id: item.id }))} aria-label="Giảm số lượng">
          −
        </button>
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={handleQuantityChange}
          aria-label={`Số lượng ${item.title}`}
        />
        <button onClick={() => dispatch(incrementQuantity({ id: item.id }))} aria-label="Tăng số lượng">
          +
        </button>
      </div>

      <p className="cart-item-subtotal">{currencyFormatter.format(item.price * item.quantity)}</p>

      <button className="cart-item-remove" onClick={() => dispatch(removeFromCart({ id: item.id }))}>
        Xoá
      </button>
    </li>
  );
}
