import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for JWT token when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/checkAuth");
        if (response.status === 200) {
          setUser(response.data.user); // Set user data from token
        }
      } catch (error) {
        setUser(null); // Not authenticated
      } finally {
        setLoading(false); // Done loading
      }
    };

    checkAuth();
  }, []);

  const login = async (pin) => {
    try {
      await axios.post("/api/login", { pin });
      router.push("/"); // Redirect to home after login
    } catch (error) {
      throw new Error("Invalid PIN");
    }
  };

  const logout = async () => {
    await axios.post("/api/logout");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
