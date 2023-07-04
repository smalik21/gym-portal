import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accountId, setAccountId] = useState('');
  const [accountType, setAccountType] = useState('');

  const login = (id, type) => {
    console.log("auth:", id, type);
    setAccountId(id);
    setAccountType(type);
  };

  const logout = () => {
    setAccountId('');
    setAccountType('');
  };

  return (
    <AuthContext.Provider value={{ accountId, accountType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
