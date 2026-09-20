import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../cart/cartSlice';
import { useGetProductsQuery } from './productsApi';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export function ProductList() {
  const dispatch = useAppDispatch();
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();

  if (isLoading) {
    return <p className="status-message">Đang tải sản phẩm...</p>;
  }

  if (isError) {
    return (
      <div className="status-message">
        <p>Không thể tải danh sách sản phẩm.</p>
        <button onClick={() => refetch()}>Thử lại</button>
      </div>
    );
  }

  return (
    <ul className="product-grid">
      {products?.map((product) => (
        <li key={product.id} className="product-card">
          <img src={product.image} alt={product.title} loading="lazy" />
          <h3>{product.title}</h3>
          <p className="product-price">{currencyFormatter.format(product.price)}</p>
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                }),
              )
            }
          >
            Thêm vào giỏ
          </button>
        </li>
      ))}
    </ul>
  );
}
