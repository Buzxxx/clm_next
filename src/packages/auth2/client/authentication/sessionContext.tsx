"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { user_service } from "./resources/handleUser";
import { fetchSession } from "./clientFetchSession";
import AuthConfig from "../../authConfig";

interface User {
  id: number;
  first_name: string;
  full_name: string;
  email: string;
  role: string;
  account_name: string;
}

interface SessionContextType {
  user: User | null;
  loading: boolean;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  setUser: (user: User | null) => void;
  userLogout: () => void;
  hasUserAccess: (ACCESS_ROLES: string[]) => boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

const mapUser = (user: any): User => ({
  id: user?.user_id ?? null,
  first_name: user?.first_name ?? user?.name ?? "Guest",
  full_name: user?.full_name ?? user?.name ?? "Guest",
  email: user?.email ?? "guest@example.com",
  role: user?.role ?? "guest",
  account_name: user?.account_name ?? "Guest",
});

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [user, setUserState] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const setUser = useCallback((user: User | null) => {
    setUserState(user);
  }, []);

  const userLogout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
  }, [setUser]);

  const hasUserAccess = useCallback(
    (roles: string[]) => (user?.role ? roles.includes(user.role) : false),
    [user]
  );

  useEffect(() => {
    const initializeSession = async () => {
      const redirect_to_default = () => {
        router.replace(AuthConfig.authentication.logoutRedirect);
      };
      setLoading(true);
      try {
        const session = await fetchSession();
        const tempAccessToken = session?.accessToken;
        if (tempAccessToken) {
          setAccessToken(tempAccessToken);
        } else {
          redirect_to_default();
        }
        const fetchedUser = await user_service(tempAccessToken);
        if (fetchedUser) {
          setUser(mapUser(fetchedUser));
        } else {
          redirect_to_default();
        }
      } catch (err) {
        console.error("Session init failed:", err);
        redirect_to_default();
      } finally {
        setLoading(false);
      }
    };

    initializeSession();
  }, [setUser, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {AuthConfig.ui.loading}
      </div>
    );
  }

  return (
    <SessionContext.Provider
      value={{
        user,
        loading,
        accessToken,
        setAccessToken,
        setUser,
        userLogout,
        hasUserAccess,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
