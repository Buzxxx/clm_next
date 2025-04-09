import CONFIG from "@/global/config";

const env = CONFIG.DEBUG ? "LOCAL" : "PUBLIC";

const ApiClientConfig = {
  environment: env,
  domains: CONFIG.DOMAINS,
  DEFAULT_LOGIN_REDIRECT: CONFIG.AUTH.DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGOUT_REDIRECT: CONFIG.AUTH.DEFAULT_LOGOUT_REDIRECT,
  url: {
    session: "/api/auth/session",
    refresh: "/api/auth/session/renew",
  },
};

export default ApiClientConfig;
