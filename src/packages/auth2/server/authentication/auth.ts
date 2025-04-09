"use server";

import { login_service } from "./resources/login";
import Session from "./resources/session";

class Auth {
  async login(username: string, password: string) {
    const loginData = await login_service(username, password);
    const session = await new Session().set_session(loginData);
    if (!session) return null;
    return session;
  }

  async logout() {
    return await new Session().clear_session();
  }

  async renew_session() {
    const newSession = await new Session().renew_session();
    if (!newSession) return null;
    return newSession;
  }

  async validate_session() {
    const session = await new Session().get_session();
    if (!session) return null;
    return session;
  }
}

export default Auth;
