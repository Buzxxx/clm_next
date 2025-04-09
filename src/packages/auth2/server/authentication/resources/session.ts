"use server";

import { cookies } from "next/headers";
import { renew_token } from "./renewToken";
import { JwtSession } from "../../jwtServices";
import AuthConfig from "../../../authConfig";

class Session {
  private secretKey = AuthConfig.secretKey;
  private SESSION_AGE = 7 * 24 * 60 * 60;
  private SESSION_NAME = "session";

  private async encrypt(data: Record<string, any>): Promise<string | null> {
    return await new JwtSession(this.secretKey).encrypt(data);
  }

  private async decrypt(token: string): Promise<Record<string, any> | null> {
    return await new JwtSession(this.secretKey).decrypt(token);
  }

  async set_session(sessionData: Record<string, any>) {
    try {
      if (!sessionData || typeof sessionData !== "object") {
        throw new Error("Invalid session data");
      }

      const encryptedSession = await this.encrypt(sessionData);
      if (!encryptedSession) return null;

      const cookieStore = await cookies();
      cookieStore.set(this.SESSION_NAME, encryptedSession, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: this.SESSION_AGE,
        path: "/",
      });

      return true;
    } catch (error) {
      console.error("Error setting session:", error);
      return null;
    }
  }

  async get_session(): Promise<Record<string, any> | null> {
    try {
      const cookieStore = await cookies();
      const encryptedSession = cookieStore.get(this.SESSION_NAME)?.value;
      if (!encryptedSession) return null;

      return await this.decrypt(encryptedSession);
    } catch (error) {
      console.error("Error getting session:", error);
      return null;
    }
  }

  async clear_session() {
    try {
      const cookieStore = await cookies();
      cookieStore.set(this.SESSION_NAME, "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
        path: "/",
      });
    } catch (error) {
      console.error("Error clearing session:", error);
      return null;
    }
  }

  async renew_session() {
    try {
      const activeSession = await this.get_session();
      const refreshToken = activeSession?.refreshToken;
      if (!refreshToken) return false;
      const newSession = await renew_token(refreshToken);
      if (!newSession) return false;

      const newEncryptedSession = await this.encrypt(newSession);
      if (!newEncryptedSession) return false;

      const cookieStore = await cookies();
      cookieStore.set(this.SESSION_NAME, newEncryptedSession, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: this.SESSION_AGE,
        path: "/",
      });

      return true;
    } catch (error) {
      console.error("Error renewing session:", error);
      return null;
    }
  }
}

export default Session;
