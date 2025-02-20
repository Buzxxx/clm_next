const DEBUG = false; // true for development, false for production

// export const DEFAULT_LOGIN_REDIRECT = "/home";
// export const DEFAULT_LOGOUT_REDIRECT = "/auth/login";

export interface Server {
  baseDomain: string;
  version: string;
}

let ProdServer: Server = {
  baseDomain: "https://clm.centralindia.cloudapp.azure.com/",
  version: "1.0.0",
};

let ProdBackendServer: Server = {
  baseDomain: "",
  version: "1.0.0",
};

if (DEBUG) {
  ProdServer = {
    baseDomain: "http://localhost:3000/",
    version: "1.0.0",
  };

  ProdBackendServer = {
    baseDomain: "http://localhost:8080/",
    version: "1.0.0",
  };
}

const Servers = {
  ProdBackendServer,
  ProdServer,
};

export default Servers;

// Common breakpoints (in pixels) - useResponsive.ts library
export const SCREEN_SIZES = {
  mobile: 768,
  tablet: 1024,
  laptop: 1440,
  desktop: Infinity,
};
