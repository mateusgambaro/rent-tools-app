import React, { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (token) {
      setIsLoggedIn(true);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const saveUserId = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, setUserId: saveUserId }}>
      {children}
    </UserContext.Provider>
  );
};
