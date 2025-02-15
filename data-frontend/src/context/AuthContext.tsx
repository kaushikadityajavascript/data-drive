import { createContext, useState, useEffect, useContext } from "react";
import { login as loginApi } from "../api/api";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

 const login = async (email: string, password: string) => {
  try {
    const response = await loginApi(email, password);
    console.log("Login API Response:", response.data); 

    if (response.data && response.data.data && response.data.data.token) {
      const token = response.data.data.token; 
       setUser(response.data.data);
      setToken(token);
      localStorage.setItem("token", token); 
      return true;
    } else {
      console.error("Login failed: No token received");
      alert("Invalid login credentials.");
      return false;
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Login failed. Please check your credentials.");
    return false;
  }
};

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
