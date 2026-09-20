import './App.css';
import { Cart } from './features/cart/Cart';
import { ProductList } from './features/products/ProductList';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Cửa hàng demo</h1>
        <p>Redux Toolkit + RTK Query — Giỏ hàng</p>
      </header>

      <main className="app-main">
        <section className="products-section">
          <h2>Sản phẩm</h2>
          <ProductList />
        </section>

        <aside className="cart-section">
          <Cart />
        </aside>
      </main>
    </div>
  );
}

export default App;
