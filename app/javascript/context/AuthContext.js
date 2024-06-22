// app/javascript/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated when the app loads
    fetch('/users/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        setIsAuthenticated(false);
      });
  }, []);

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    fetch('/users/sign_out', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(false);
        } else {
          console.error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Logout failed', error);
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
