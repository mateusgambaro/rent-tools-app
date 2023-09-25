import React from "react";
import "./CartDetails.css";

export const CartDetails = ({ name, content, price, image }) => {
  return (
    <div className="cart-details-card">
      <div className="cart-details-content">
        <img src={image} alt={name} width={50}/>
        <div>{name}</div>
      </div>
      <strong>{price}</strong>
    </div>
  );
};

export default CartDetails;
