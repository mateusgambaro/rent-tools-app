import React from "react";
import "./styles.css";
import { FaHammer } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeHero = (props) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="hero-background">
        <img
          src={props.coverImg}
          alt="Background Cover"
          className="background-image"
          loading="lazy"
        />
        <div className={props.cName}>
          <div className="hero-content">
            <div className="hero-text">
              <h1>{props.title}</h1>
              <h2>{props.subtitle}</h2>
              <button className={props.btnClass} onClick={() => navigate('/products')}>
                <FaHammer className="whatsapp-icon" /> {props.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeHero;
