import React, { useContext } from "react";
import "./styles.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import LoginPage from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import CheckoutPage from "./pages/Checkout";
import { CartProvider, useCart } from "./api/CartContext";
import RegisterPage from "./pages/Register";
import { UserProvider } from "./api/UserContext";
import Profile from "./pages/Profile";
import { DrawerContext, DrawerProvider } from "./api/DrawerContext";
import { Button, Drawer } from "antd";

function App() {
  return (
    <CartProvider>
      <DrawerProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </DrawerProvider>
    </CartProvider>
  );
}

function AppContent() {
  const { isDrawerVisible, setIsDrawerVisible } = useContext(DrawerContext);
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="App">
      <Drawer
        title="Meu Carrinho"
        placement="bottom"
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
      >
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.title} - R${product.price}
              <Button
                type="danger"
                onClick={() => removeFromCart(product)}
                style={{ marginLeft: '10px' }}
              >
                Remover
              </Button>
            </li>
          ))}
        </ul>
        <h3>Total: R${total}/dia</h3>
      </Drawer>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
