import { createContext, useContext, useState, useEffect } from "react";
import { getAccessToken, setAccessToken, removeAccessToken } from "../utils/authStorage";

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getAccessToken());

  useEffect(() => {
    if (token) {
      setAccessToken(token);
    }
  }, [token]);

  const login = (newToken: string) => {
    setAccessToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    removeAccessToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
