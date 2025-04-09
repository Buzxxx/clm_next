import ApiClientConfig from "./apiClientConfig";

export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  mode?: RequestMode;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  redirect?: RequestRedirect;
  timeout?: number;
}

type ServerName = "FRONTEND" | "BACKEND";
type Interceptor<T> = (input: T) => Promise<T>;

class ApiClient {
  private static instance: ApiClient;
  private defaultHeaders: HeadersInit;
  private onError?: (error: Error | string) => void;
  private requestInterceptor?: Interceptor<RequestInit>;
  private responseInterceptor?: Interceptor<Response>;

  private constructor() {
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public setErrorHandler(handler: (error: Error | string) => void) {
    this.onError = handler;
  }

  public setRequestInterceptor(interceptor: Interceptor<RequestInit>) {
    this.requestInterceptor = interceptor;
  }

  public setResponseInterceptor(interceptor: Interceptor<Response>) {
    this.responseInterceptor = interceptor;
  }

  private getApiUrl(serverName: keyof typeof ApiClientConfig.domains): string {
    const url = ApiClientConfig.domains[serverName]?.replace(/\/$/, "");
    if (!url) throw new Error(`Invalid server name: ${serverName}`);
    return url;
  }

  private getFullUrl(endpoint: string, serverName: ServerName): string {
    return `${this.getApiUrl(serverName)}/${endpoint.replace(/^\/\//, "")}`;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout = 10000
  ): Promise<Response> {
    return Promise.race([
      fetch(url, options),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), timeout)
      ),
    ]);
  }

  public async request(
    endpoint: string,
    serverName: ServerName,
    options: RequestOptions = {}
  ): Promise<Response | null> {
    const url = this.getFullUrl(endpoint, serverName);
    const timeout = options.timeout ?? 10000;
    const headers: Record<string, string> = {
      ...(this.defaultHeaders as Record<string, string>),
      ...options.headers,
    };

    let requestInit: RequestInit = {
      method: options.method || "GET",
      headers,
      body: options.body,
      mode: options.mode || "cors",
      credentials: options.credentials || "include",
      cache: options.cache,
      redirect: options.redirect,
    };

    if (this.requestInterceptor) {
      requestInit = await this.requestInterceptor(requestInit);
    }

    try {
      let response = await this.fetchWithTimeout(url, requestInit, timeout);

      if (this.responseInterceptor) {
        response = await this.responseInterceptor(response);
      }

      return response;
    } catch (error) {
      this.onError?.(error instanceof Error ? error : String(error));
      return null;
    }
  }

  public get(
    endpoint: string,
    serverName: ServerName,
    options?: RequestOptions
  ) {
    return this.request(endpoint, serverName, { method: "GET", ...options });
  }

  public post(
    endpoint: string,
    serverName: ServerName,
    body: object,
    options?: RequestOptions
  ) {
    return this.request(endpoint, serverName, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  }

  public put(
    endpoint: string,
    serverName: ServerName,
    body: object,
    options?: RequestOptions
  ) {
    return this.request(endpoint, serverName, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    });
  }

  public delete(
    endpoint: string,
    serverName: ServerName,
    options?: RequestOptions
  ) {
    return this.request(endpoint, serverName, { method: "DELETE", ...options });
  }
}

export default ApiClient.getInstance();
