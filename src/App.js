import React, { useContext } from "react";
import "./styles.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import LoginPage from "./pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import CheckoutPage from "./pages/Checkout";
import { CartProvider, useCart } from "./api/CartContext";
import RegisterPage from "./pages/Register";
import { UserContext, UserProvider } from "./api/UserContext";
import Profile from "./pages/Profile";
import { DrawerContext, DrawerProvider } from "./api/DrawerContext";
import { Button, Drawer, notification } from "antd";
import { CartDetails } from "./components/CartDetails";
import { FaTrash } from "react-icons/fa";

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
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  const proceedToCheckout = () => {
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      notification.error({
        message: "Não autorizado",
        description: "Você deve estar logado para prosseguir para o checkout.",
      });
      navigate("/login");
    }
  };

  console.log("Cart", cart);
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
            <div key={product.id} className="cart-item-container">
              <CartDetails
                image={product.image}
                name={product.heading}
                price={`R$${product.price}/dia`}
              />
              <Button
                type="danger"
                onClick={() => removeFromCart(product)}
                style={{ marginLeft: "10px" }}
              >
                <FaTrash />
              </Button>
            </div>
          ))}
        </ul>
        <h3 style={{ margin: "20px" }}>Total: R${total}/dia</h3>
        <div style={{ display: "flex", justifyContent: 'center' }}>
          <button onClick={proceedToCheckout}>Ir para Checkout</button>
        </div>
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
