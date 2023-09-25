import React, { useContext, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./styles.css";
import { UserContext } from "../../api/UserContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setUserId } = useContext(UserContext);
  const navigate = useNavigate()
  notification.config({
    placement: "bottom",
    bottom: 50,
    duration: 3,
  });

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      const { userLogged } = response.data;
      if (userLogged.token) {
        localStorage.setItem("token", userLogged.token);
        setIsLoggedIn(true);
        setUserId(userLogged.id)
        navigate('/profile')
      }
      notification.success({
        message: "Seja bem-vindo!",
        description: "Boas compras.",
      });
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
      setIsLoading(false);
      notification.error({
        message: "Erro!",
        description: "Erro ao realizar o login",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Entrar"}
      </Button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;
