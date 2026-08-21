import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "@/lib/api";

export interface AdminUser {
  email: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "arkaan-auth";
const TOKEN_KEY = "arkaan-token";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await api.post("/site/login", { email, password });
      const userData: AdminUser = { email: data.user.email, isAuthenticated: true };
      setUser(userData);
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      sessionStorage.setItem(TOKEN_KEY, data.token);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    api.post("/site/logout").catch(() => {});
    setUser(null);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useIsAdmin() {
  const { user } = useAuth();
  return user?.isAuthenticated ?? false;
}