import AuthConfig from "../../../authConfig";

export async function user_service(accessToken: string) {
  const baseUrl =
    AuthConfig.backendDomain + AuthConfig.authentication.serverUrls.register;

  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) return false;

    const res = await response.json();

    if (response.status === 200) {
      const user = res?.body?.user;
      return user || null;
    }

    return false;
  } catch (error: any) {
    console.error("User Fetch error:", error);
    return null;
  }
}
