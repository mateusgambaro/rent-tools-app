import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./styles.css";
import { UserContext } from "../../api/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { formatDate } from '../../utils/DateFormat'

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userId");
      try {
        const orderResponse = await axios.get(
          `http://localhost:3000/order/${user}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const userResponse = await axios.get(
          `http://localhost:3000/user/${user}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setUserData(userResponse.data);
        setOrders(orderResponse.data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="user-info">
        <h2>{userData.name}</h2>
        <p>Email: {userData.email}</p>
        <p>Documento: {userData.document}</p>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          style={{ marginTop: "16px" }}
        >
          Sair
        </Button>
      </div>
      <h1 style={{ marginBottom: "10px", textAlign: "left", margin: '4rem 6rem' }}>Meus Pedidos</h1>
      <div className="products-list">
        {!orders || orders.length <= 0 ? (
          <h5 style={{ textAlign: "center" }}>Nenhum pedido</h5>
        ) : (
          <>
            {orders?.map((order, index) => (
              <Card className="order-card" key={index}>
                <CardMedia
                  className="order-img"
                  component="img"
                  height="150"
                  image={order.products?.image}
                  alt={order.products?.title}
                  sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {order.products?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Preço: R${order.products?.price}/dia
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Data da compra: {formatDate(order.products?.createdAt)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
