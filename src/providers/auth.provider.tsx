"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useGetMe } from "@/hooks/useAuth";
import type { ProfileData } from "@/types";

const FLAG_KEY = "civicserve:loggedIn";

type TAuthContext = {
  user: ProfileData | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => void;
  clearSession: () => void;
};

const AuthContext = createContext<TAuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [hasFlag, setHasFlag] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setHasFlag(localStorage.getItem(FLAG_KEY) === "1");
    } catch {
      setHasFlag(false);
    }
  }, []);

  const { data, isLoading, error } = useGetMe(hasFlag === true);

  const clearSession = useCallback(() => {
    try {
      localStorage.removeItem(FLAG_KEY);
    } catch {}
    setHasFlag(false);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    if (error && (error as { status?: number }).status === 401) clearSession();
  }, [error, clearSession]);

  const login = useCallback(() => {
    try {
      localStorage.setItem(FLAG_KEY, "1");
    } catch {}
    setHasFlag(true);
  }, []);

  const user = hasFlag ? (data?.data ?? null) : null;

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      isLoading: hasFlag === null || isLoading,
      login,
      clearSession,
    }),
    [user, hasFlag, isLoading, login, clearSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// TODO: write a commit for create user logged in global state