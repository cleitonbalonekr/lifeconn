import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

import { AuthUser } from '@/domain/models';

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  saveUserSate(user: AuthUser): void;
  signOut(): void;
  authUser: AuthUser;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AsyncAuthUserKey = '@lifeconn-AuthUser';

export const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem(AsyncAuthUserKey);
      if (storageUser) {
        setAuthUser(JSON.parse(storageUser));
        setSigned(true);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function saveUserSate(user: AuthUser) {
    setAuthUser(user);
    await AsyncStorage.setItem(AsyncAuthUserKey, JSON.stringify(user));
    setSigned(true);
  }
  async function signOut() {
    setAuthUser(null);
    setSigned(false);
    await AsyncStorage.removeItem(AsyncAuthUserKey);
  }

  return (
    <AuthContext.Provider
      value={{
        signed,
        loading,
        saveUserSate,
        signOut,
        authUser: authUser as AuthUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
