import settings, { Server } from "@/settings/settings";
import { getCookie } from "@pkg/cookieService/cookieService";

export interface RequestOptions {
  method: string;
  headers?: HeadersInit;
  body?: string;
  skipAuth?: boolean;
}

async function get_access_token() {
  const accessTokenName = "accessToken";
  return await getCookie(accessTokenName);
}

const apiClient = async (
  endpoint: string,
  serverName: string,
  options: RequestOptions
) => {
  const url = apiurls(endpoint, serverName);
  const token = options.skipAuth ? null : await get_access_token();
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    // Check if the response is not OK (status code not in the range 200-299)
    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    // Try parsing the response body as JSON
    try {
      return await response.json();
    } catch {
      // If parsing fails (e.g., empty response), return the raw response
      return response;
    }
  } catch (error: any) {
    console.error("API Client error:", error);
    console.error("API Client error message:", error.message);
  }
};

function apiurls(endpoint: string, serverName: string): string {
  const server: Server | undefined = (settings as any)[serverName];
  if (!server) {
    throw new Error(`Server configuration '${serverName}' not found.`);
  }

  const baseUrl = server.baseDomain.endsWith("/")
    ? server.baseDomain.slice(0, -1)
    : server.baseDomain;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  return `${baseUrl}${path}`;
}

export default apiClient;
