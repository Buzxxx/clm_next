import AuthApi from "@/packages/auth2/server/authentication/authApi";

export async function POST(request: Request) {
  return await new AuthApi(request).login_api();
}
