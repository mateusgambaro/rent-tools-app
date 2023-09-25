import React, { useContext, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './styles.css'
import { UserContext } from '../../api/UserContext';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const { setIsLoggedIn, setUserId } = useContext(UserContext);
  const navigate = useNavigate()

  const handleRegister = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/user', {
        name,
        email,
        password,
        document,
      });
      const { user } = response.data;
      if (user.token) {
        localStorage.setItem('token', user.token);
        setIsLoggedIn(true);
        setUserId(user.user); 
        navigate('/products')
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Documento"
        variant="outlined"
        fullWidth
        margin="normal"
        value={document}
        onChange={(e) => setDocument(e.target.value)}
      />
     <Button 
        variant="contained" 
        color="primary" 
        onClick={handleRegister} 
        style={{ marginTop: '16px' }}
        disabled={isLoading} 
      >
        {isLoading ? <CircularProgress size={24} /> : 'Cadastrar'}
      </Button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Register;
