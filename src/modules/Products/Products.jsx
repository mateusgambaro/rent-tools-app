import React, { useState, useEffect } from "react";
import "./styles.css";
import ProductCard from "../../components/ProductCard";
import axios from "axios";
import { Modal } from "antd";
import { useCart } from "../../api/CartContext";
import { notification } from "antd";
import { TextField } from "@mui/material";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { cart, setCart } = useCart();
  notification.config({
    placement: "bottomRight",
    bottom: 50,
    duration: 3,
  });


  const toggleInCart = (product) => {
    const isProductInCart = cart.some((cartItem) => cartItem.id === product.id);

    if (isProductInCart) {
      setCart(cart.filter((cartItem) => cartItem.id !== product.id));
    } else {
      setCart([...cart, product]);
    }
  };

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

  const clearSearch = () => {
    setSearchTerm("");
    setOrderBy("");
    fetchProducts();
  };

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
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
          <button onClick={() => fetchProducts(searchTerm)}>
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
        onCancel={() => setIsModalVisible(false)}
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
    </div>
  );
};

export default Product;
