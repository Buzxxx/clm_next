import AuthConfig from "../../../authConfig";

export async function login_service(username: string, password: string) {
  const baseUrl =
    AuthConfig.backendDomain + AuthConfig.authentication.serverUrls.login;
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response) {
      console.warn("No response received from login request.");
      return false;
    }

    if (response.status === 200) {
      const loginData = await response.json();
      return loginData;
    }

    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}
