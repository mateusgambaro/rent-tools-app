import { FaCartPlus, FaInfoCircle, FaTrash } from "react-icons/fa";
import "./ProductStyles.css";

export const ProductCard = (props) => {
    const isInCart = props.cart.some(cartItem => cartItem.id === props.id); 

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={props.image} alt="product" />
      </div>
      <div className="texts">
        <h4 style={{ textAlign: "center" }}>{props.heading}</h4>
        <p style={{ marginBottom: "10px", textIndent: "8px" }}>{props.text}</p>
        <p className="price">R${props.price}/dia</p>
      </div>
      <button style={{marginTop: '10px'}}onClick={props.showDetails}>
        <FaInfoCircle/> &nbsp;Especificações
      </button>
      <button className={props.btnClass} onClick={() => props.toggleInCart(props)}>
        {isInCart ? (
          <>
            <FaTrash /> &nbsp; Remover do Carrinho
          </>
        ) : (
          <>
            <FaCartPlus /> &nbsp; Adicionar ao Carrinho
          </>
        )}
      </button>
    </div>
  );
};

export default ProductCard;
