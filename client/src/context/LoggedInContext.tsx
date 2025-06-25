import { User } from "@/types/User";
import { createContext, ReactNode, useState, useEffect } from "react";
import { getUserDetails } from "@/services/UserService";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode"; // fixed import
import { useNavigate } from "react-router";

type Props = {
  children: ReactNode;
};

type LoggedInContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  loggedInUser: User | null;
  setLoggedInUser: (user: User | null) => void;
};

const LoggedInContext = createContext<LoggedInContextType | undefined>(
  undefined
);

const setupAutoLogout = (logout: () => void) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const expiryTime = decoded.exp * 1000;
    const timeout = expiryTime - Date.now();

    if (timeout <= 0) {
      logout();
    } else {
      setTimeout(() => {
        logout();
        toast.info("Session expired. Please log in again.");
      }, timeout);
    }
  } catch (e) {
    console.error("Failed to decode token", e);
    logout();
  }
};

function LoggedInProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!loggedInUser) {
      getUserDetails()
        .then((user) => {
          if (user) {
            setLoggedInUser(user);
            setIsLoggedIn(true);
            setupAutoLogout(logout);
          }
        })
        .catch((error) => {
          toast.error("Failed to fetch user info.");
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, []);

  return (
    <LoggedInContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser }}
    >
      {children}
    </LoggedInContext.Provider>
  );
}

export { LoggedInContext, LoggedInProvider, setupAutoLogout };
