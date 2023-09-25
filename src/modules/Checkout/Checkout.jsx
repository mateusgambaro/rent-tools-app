import React, { useState } from "react";
import { useCart } from "../../api/CartContext";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import './styles.css'

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const total = cart?.reduce((sum, product) => sum + product.price, 0);
  notification.config({
    placement: "bottomRight",
    bottom: 50,
    duration: 5,
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");

    if (!file) {
      return notification.error({
        message: "Ops! Precisamos da sua identificação.",
        description: "Por favor, faça o upload do seu documento."
      })
    }

    const orderData = {
      products: JSON.stringify(cart.map((product) => product.id)),
      userId
    };
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:3000/order", orderData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      notification.success({
        message: "Sucesso!",
        description: "Seu pedido foi finalizado.",
      });
      navigate("/profile");
    } catch (error) {
      notification.error({
        message: "Erro!",
        description: "Error ao realizar o pedido. Tente novamente!",
      });
      console.error(error);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <div className="product-list">
        {cart?.map((product, index) => (
          <div className="product-item" key={index}>
            <img src={product.image} className="product-img" alt={product.title} />
            <h4 className="product-title">{product.heading}</h4>
            <p className="product-price">R${product.price}/dia</p>
          </div>
        ))}
      </div>
      <h3 className="total-price">Total: R${total}/dia</h3>
      <div className="file-upload">
        <label className="file-label">Precisamos da sua identidade</label>
        <input type="file" className="file-input" onChange={handleFileChange} />
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Finalizar Compra</button>
    </div>
  );
};

export default Checkout;
