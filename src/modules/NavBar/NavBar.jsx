import React, { useState, useEffect, useContext } from "react";
import { MenuItems } from "../../components/MenuItems";
import IconLogoWhite from "../../logo.svg";
import { NavbarContainer } from "./styled";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../api/UserContext";
import { DrawerContext } from "../../api/DrawerContext";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 850);
  const { isLoggedIn } = useContext(UserContext);
  const { isDrawerVisible, setIsDrawerVisible } = useContext(DrawerContext);

  const filteredMenuItems = MenuItems.filter((item) => {
    if (isLoggedIn && item.showWhenLoggedIn) return true;
    if (!isLoggedIn && item.showWhenLoggedOut) return true;
    if (!item.showWhenLoggedIn && !item.showWhenLoggedOut) return true;

    return false;
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 850);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NavbarContainer>
      <div className="logo-container">
        <img
          src={IconLogoWhite}
          alt="logo-white"
          className="navbar-logo-img"
          loading="lazy"
        />
        <div className="title-container">
          <h1 className="navbar-logo">AlluTools</h1>
        </div>
      </div>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {filteredMenuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.url}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? isDesktop
                    ? "active"
                    : "nav-links"
                  : "nav-links"
              }
            >
              <i className={item.icon}></i>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
      {isDesktop ? (
        <button onClick={() => setIsDrawerVisible(true)}>
          Meu carrinho 🛒
        </button>
      ): (
        <button style={{marginRight: "15%"}}onClick={() => setIsDrawerVisible(true)}>
          🛒
        </button>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
