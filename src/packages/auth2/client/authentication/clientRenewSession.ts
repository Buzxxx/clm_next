import AuthConfig from "../../authConfig";

export async function renewSession(fetchFn = fetch): Promise<boolean> {
  try {
    const response = await fetchFn(
      AuthConfig.clientDomain.replace(/\/$/, "") +
        AuthConfig.authentication.clientUrls.refresh,
      { method: "POST" }
    );
    return response.ok;
  } catch (error) {
    console.error("renewSession error:", error);
    return false;
  }
}
