import { Spinner } from "@/components/ui/icons";
import CONFIG from "@/global/config";
import React from "react";

const AuthConfig = {
  debug: CONFIG.DEBUG,
  secretKey: CONFIG.SECRET_KEY,
  backendDomain: CONFIG.DOMAINS.BACKEND,
  clientDomain: CONFIG.DOMAINS.FRONTEND,
  authentication: {
    loginRedirect: CONFIG.AUTH.DEFAULT_LOGIN_REDIRECT,
    logoutRedirect: CONFIG.AUTH.DEFAULT_LOGOUT_REDIRECT,
    // backend auth api urls
    serverUrls: {
      login: "/auth/api/login",
      logout: "/auth/api/logout",
      register: "/auth/api/me",
      refresh: "auth/api/token/refresh",
    },
    clientUrls: {
      session: "/api/auth/session",
      refresh: "/api/auth/session/renew",
    },
  },
  authorization: {
    url: { unauthorized: "/unauthorized" },
  },
  ui: { loading: React.createElement(Spinner) },
};

export default AuthConfig;
