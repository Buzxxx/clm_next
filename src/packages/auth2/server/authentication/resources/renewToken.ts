import AuthConfig from "../../../authConfig";

interface SessionData {
  accessToken: string;
  refreshToken: string;
}

export async function renew_token(
  refreshToken: string
): Promise<SessionData | null> {
  const baseUrl =
    AuthConfig.backendDomain + AuthConfig.authentication.serverUrls.refresh;
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response?.ok) {
      const errorMsg = await response?.json();
      return null;
    }

    const sessionData = await response.json();
    if (!sessionData) return null;

    return sessionData;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}
