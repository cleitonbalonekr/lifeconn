import React, { createContext, useState, useContext } from 'react';

export interface AuthContextData {
  signed: boolean;
  signIn(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSigned] = useState(true);

  async function signIn() {
    try {
      setSigned(true);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <AuthContext.Provider value={{ signed, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
