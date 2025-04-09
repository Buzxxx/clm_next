const debug = false; // true for development, false for production
const secret_key = "";
const publicDomains = {
  FRONTEND: "https://clm.centralindia.cloudapp.azure.com/",
  BACKEND: "https://clm.centralindia.cloudapp.azure.com/",
};
const localDomains = {
  FRONTEND: "http://localhost:3000/",
  BACKEND: "http://localhost:8080/",
};

const selectedDomains = debug ? localDomains : publicDomains;

const CONFIG = {
  DEBUG: debug,
  SECRET_KEY: secret_key,
  DOMAINS: selectedDomains,
  // authentication settings
  AUTH: {
    DEFAULT_LOGIN_REDIRECT: "/home",
    DEFAULT_LOGOUT_REDIRECT: "/auth/login",
  },

  // Common breakpoints (in pixels) - useResponsive.ts library
  SCREEN_SIZES: {
    mobile: 768,
    tablet: 1024,
    laptop: 1440,
    desktop: Infinity,
  },
};

export default CONFIG;
