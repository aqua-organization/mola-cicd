import { AuthContext } from "./authContext";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { checkUserStatus } from "../../services/userService";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchUserStatus = async () => {
      setIsLoading(true);
      try {
        const response = await checkUserStatus();
        if (response.success && response.data) {
          setUser(response.data);
          setIsAuthenticated(true);
          navigate("/");
        } else {
          setUser(null);
          setIsAuthenticated(false);
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserStatus();
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      if (isAuthenticated) {
        if (location.pathname.startsWith("/auth")) {
          navigate("/");
        }
      } else {
        if (!location.pathname.startsWith("/auth")) {
          navigate("/auth/login");
        }
      }
    }
  }, [user, isLoading, navigate, isAuthenticated, location]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
