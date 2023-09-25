import React from "react";
import "./ProductDetailsStyles.css";

const ProductDetails = ({ name, info }) => {
  return (
    <div className="product-details-card">
      <div>
        <div>{name}</div>
      </div>
      <strong>{info}</strong>
    </div>
  );
};

export default ProductDetails;
