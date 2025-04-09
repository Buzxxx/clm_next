import AuthConfig from "../../authConfig";

export async function fetchSession(fetchFn = fetch) {
  try {
    const response = await fetchFn(
      AuthConfig.clientDomain.replace(/\/$/, "") +
        AuthConfig.authentication.clientUrls.session,
      { method: "POST" }
    );

    if (!response.ok) throw new Error("Token fetch failed");

    return await response.json();
  } catch (error) {
    console.error("fetchAccessToken error:", error);
    return null;
  }
}
