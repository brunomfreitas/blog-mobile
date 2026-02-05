// auth/AuthContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setApiToken } from "../services/api";
import { loginRequest, meRequest } from "../services/authService";

const AuthContext = createContext(null);
const STORAGE_KEY = "@blogapp_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [booting, setBooting] = useState(true);

  async function persist(nextUser, nextToken) {
    setUser(nextUser);
    setToken(nextToken);
    setApiToken(nextToken);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user: nextUser, token: nextToken })
    );
  }

  async function signOut() {
    setUser(null);
    setToken(null);
    setApiToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        const data = JSON.parse(raw);
        const savedToken = data?.token;

        if (!savedToken) return;

        setApiToken(savedToken);

        // ✅ valida token no backend (igual web)
        const me = await meRequest();
        setUser(me);
        setToken(savedToken);
      } catch (e) {
        await signOut();
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  async function signIn(loginValue, password) {
    const data = await loginRequest(loginValue, password); // { token }
    const nextToken = data?.token;

    setApiToken(nextToken);

    // ✅ mantém padrão: pega /me
    const me = await meRequest();
    await persist(me, nextToken);

    return { user: me, token: nextToken };
  }

  const value = useMemo(
    () => ({
      user,
      token,
      booting,
      signIn,
      signOut,
      isAuthenticated: !!token,
    }),
    [user, token, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
