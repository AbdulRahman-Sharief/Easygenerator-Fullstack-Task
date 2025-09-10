"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api } from "../lib/api";

export type User = {
  _id: string;
  name: string;
  email: string;
  passwordChangedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (payload: { email: string; password: string }) => Promise<void>;
  signup: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signout: () => Promise<void>;
  accessToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api<{
          status: string;
          message: string;
          user?: User;
        }>("/user/profile", {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        });
        if (mounted) setUser(data?.user ?? null);
      } catch (err) {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [accessToken]);

  async function signup(payload: {
    name: string;
    email: string;
    password: string;
  }) {
    const data = await api<{
      status: string;
      message: string;
      data?: { accessToken: string; user: Partial<User> };
    }>("/auth/signup", {
      method: "POST",
      body: payload,
    });
    setAccessToken(data?.data?.accessToken ?? null);
    setUser(data.data?.user as User);
  }

  async function login(payload: { email: string; password: string }) {
    const data = await api<{
      status: string;
      message: string;
      data?: { accessToken: string; user: Partial<User> };
    }>("/auth/login", {
      method: "POST",
      body: payload,
    });
    setAccessToken(data?.data?.accessToken ?? null);
    setUser(data.data?.user as User);
  }

  async function signout() {
    setUser(null);
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, signout, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
