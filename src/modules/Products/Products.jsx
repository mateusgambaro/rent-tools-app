import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import ProductCard from "../../components/ProductCard";
import axios from "axios";
import { Drawer, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../api/CartContext";
import { notification } from "antd";
import { UserContext } from "../../api/UserContext";
import { DrawerContext } from "../../api/DrawerContext";
import { Button, TextField } from "@mui/material";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isDrawerVisible, setIsDrawerVisible } = useContext(DrawerContext);
  const { cart, setCart } = useCart();
  notification.config({
    placement: "bottomRight",
    bottom: 50,
    duration: 3,
  });

  const navigate = useNavigate();

  const toggleInCart = (product) => {
    const isProductInCart = cart.some((cartItem) => cartItem.id === product.id);

    if (isProductInCart) {
      setCart(cart.filter((cartItem) => cartItem.id !== product.id));
    } else {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((cartItem) => cartItem.id !== product.id));
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  const fetchProducts = async () => {
    try {
      let url = "http://localhost:3000/products?";
      if (searchTerm) url += `search=${searchTerm}&`;
      if (orderBy) url += `orderBy=${orderBy}`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Houve um erro ao buscar os produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [orderBy]);

  const handleSearch = () => {
    fetchProducts(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setOrderBy("");
    fetchProducts();
  };

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { isLoggedIn } = useContext(UserContext);

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

  return (
    <div className="product">
      <h1 style={{ marginBottom: "10px", textAlign: "left" }}>Ferramentas</h1>
      <select onChange={(e) => setOrderBy(e.target.value)}>
        <option value="">Ordenar por</option>
        <option value="price">Preço</option>
        <option value="alphabetical">Alfabética</option>
      </select>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          value={searchTerm}
          margin="normal"
          onChange={(e) => setSearchTerm(e.target.value)}
          label="Buscar ferramenta..."
        />
        <div style={{display: 'flex', gap: '10px'}}>
          <button onClick={handleSearch}>
            Buscar
          </button>
          <button onClick={clearSearch}>
            Limpar
          </button>
        </div>
      </div>
      <div className="productcard" style={{ marginBottom: "40px" }}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            showDetails={() => showProductDetails(product)}
            image={product.image}
            id={product.id}
            cart={cart}
            toggleInCart={toggleInCart}
            heading={product.title}
            text={product.content}
            price={product.price}
            btnClass="show"
          />
        ))}
      </div>
      <Modal
        title="Detalhes do Produto"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        {selectedProduct && (
          <>
            <h4>{selectedProduct.title}</h4>
            <p>{selectedProduct.content}</p>
            <p>R${selectedProduct.price}/dia</p>
            <p>{selectedProduct.volts}</p>
            <p>{selectedProduct.watts}</p>
            <p>{selectedProduct.usability}</p>
            <p>{selectedProduct.condition}</p>
            <p>{selectedProduct.brand}</p>
          </>
        )}
      </Modal>
      <Drawer
        title="Seu Carrinho"
        placement="bottom"
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
      >
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.heading} - R${product.price}
              <Button
                type="danger"
                onClick={() => removeFromCart(product)}
                style={{ marginLeft: "10px" }}
              >
                Remover
              </Button>
            </li>
          ))}
        </ul>
        <h3>Total: R${total}/dia</h3>
        <button onClick={proceedToCheckout}>Ir para Checkout</button>
      </Drawer>
    </div>
  );
};

export default Product;
