import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authApi from "../services/authApi";
import { clearStoredToken, decodeJwt, getStoredToken, storeToken } from "../services/apiClient";
import { getMe } from "../services/accountApi";

const AuthContext = createContext(null);

function getRolesFromToken(token) {
  const payload = decodeJwt(token);
  return Array.isArray(payload.roles) ? payload.roles : [];
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => getStoredToken());
  const [account, setAccount] = useState(null);
  const [roles, setRoles] = useState(() => getRolesFromToken(getStoredToken()));
  const [loading, setLoading] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    let active = true;

    async function loadAccount() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentAccount = await getMe();
        if (!active) return;
        setAccount(currentAccount);
        setRoles(getRolesFromToken(token));
      } catch {
        if (!active) return;
        clearStoredToken();
        setToken(null);
        setAccount(null);
        setRoles([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadAccount();

    return () => {
      active = false;
    };
  }, [token]);

  async function signIn(credentials) {
    const response = await authApi.login(credentials);
    storeToken(response.accessToken);
    setToken(response.accessToken);
    setAccount(response.account);
    setRoles(getRolesFromToken(response.accessToken));
    return response;
  }

  function signOut() {
    clearStoredToken();
    setToken(null);
    setAccount(null);
    setRoles([]);
    navigate("/auth");
  }

  function hasAnyRole(allowedRoles) {
    return allowedRoles.some((role) => roles.includes(role));
  }

  const value = useMemo(
    () => ({
      token,
      account,
      roles,
      loading,
      isAuthenticated: Boolean(token),
      signIn,
      signOut,
      setAccount,
      hasAnyRole,
    }),
    [token, account, roles, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
