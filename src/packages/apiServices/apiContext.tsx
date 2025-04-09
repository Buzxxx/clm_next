"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { fetchSession } from "@/packages/auth2/client/authentication/clientFetchSession";
import { renewSession } from "@/packages/auth2/client/authentication/clientRenewSession";
import { useSession } from "@/packages/auth2/client/authentication/sessionContext";
import ApiClientConfig from "./apiClientConfig";

type ServerName = "FRONTEND" | "BACKEND";

interface UseApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  server: ServerName;
  endpoint: string;
  body?: object;
  withToken?: boolean;
  retryCount?: number;
  timeout?: number;
  onSuccess?: (res: Response, data: any) => void;
  onError?: (err: Error) => void;
}

interface ApiContextValue {
  callApi: <T = any>(options: UseApiOptions) => Promise<T>;
  data: any;
  error: Error | null;
  status: number | null;
  loading: boolean;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken, setAccessToken } = useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const accessTokenRef = useRef<string | null>(accessToken ?? null);

  const getFullUrl = (endpoint: string, server: ServerName) => {
    const baseUrl = ApiClientConfig.domains[server]?.replace(/\/$/, "");
    if (!baseUrl) throw new Error(`Invalid server: ${server}`);
    return `${baseUrl}/${endpoint.replace(/^\/+/, "")}`;
  };

  const prepareHeaders = async (
    withToken: boolean,
    token: string | null
  ): Promise<HeadersInit> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (withToken && token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  const fetchWithTimeout = (
    url: string,
    options: RequestInit,
    timeout = 10000
  ): Promise<Response> => {
    return Promise.race([
      fetch(url, options),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), timeout)
      ),
    ]);
  };

  const interceptRequest = async (
    url: string,
    options: RequestInit
  ): Promise<[string, RequestInit]> => {
    return [url, options];
  };

  const interceptResponse = async (
    res: Response,
    retryFn: () => Promise<Response>,
    withToken: boolean,
    server: ServerName
  ): Promise<Response> => {
    if (res.status === 401 && withToken) {
      const renewed = await renewSession();
      if (!renewed) {
        if (typeof window !== "undefined") {
          window.location.href = ApiClientConfig.DEFAULT_LOGOUT_REDIRECT;
        }
        throw new Error("Session expired");
      }

      const newToken = await fetchSession();
      if (!newToken) throw new Error("Token renewal failed");

      accessTokenRef.current = newToken;
      setAccessToken(newToken);

      return await retryFn();
    }

    return res;
  };

  const callApi = useCallback(
    async <T = any,>(options: UseApiOptions): Promise<T> => {
      setLoading(true);
      setError(null);
      setData(null);
      setStatus(null);

      const {
        method = "GET",
        server,
        endpoint,
        body,
        withToken = true,
        retryCount = 1,
        timeout = 10000,
        onSuccess,
        onError,
      } = options;

      const url = getFullUrl(endpoint, server);
      let token: string | null = accessTokenRef.current;

      if (!token && withToken) {
        const sessionToken = await fetchSession();
        if (sessionToken) {
          token = sessionToken;
          accessTokenRef.current = sessionToken;
          setAccessToken(sessionToken);
        }
      }

      const makeRequest = async (
        overrideToken?: string | null
      ): Promise<Response> => {
        const headers = await prepareHeaders(withToken, overrideToken ?? token);
        const requestInit: RequestInit = {
          method,
          headers,
          credentials: "include",
          mode: "cors",
          body: body ? JSON.stringify(body) : undefined,
        };

        const [finalUrl, interceptedOptions] = await interceptRequest(
          url,
          requestInit
        );
        return await fetchWithTimeout(finalUrl, interceptedOptions, timeout);
      };

      let attempt = 0;
      while (attempt <= retryCount) {
        try {
          let res = await makeRequest();

          res = await interceptResponse(
            res,
            () => makeRequest(accessTokenRef.current),
            withToken,
            server
          );

          if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
          }

          const responseData = await res.json();
          setData(responseData);
          setStatus(res.status);
          onSuccess?.(res, responseData);
          return responseData;
        } catch (err) {
          const typedError =
            err instanceof Error ? err : new Error(String(err));
          setError(typedError);
          onError?.(typedError);
          if (attempt === retryCount) throw typedError;
          attempt++;
        }
      }

      throw new Error("Max retry attempts reached");
    },
    [setAccessToken]
  );

  return (
    <ApiContext.Provider value={{ callApi, data, error, status, loading }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};
