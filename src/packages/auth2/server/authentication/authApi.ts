"use server";

import { NextResponse } from "next/server";
import Auth from "./auth";

type LoginRequest = {
  username: string;
  password: string;
};

class AuthApi {
  private request: Request;
  constructor(request: Request) {
    this.request = request;
  }

  async login_api() {
    const { username, password }: LoginRequest = await this.request.json();
    const authStatus = await new Auth().login(username, password);
    if (authStatus) {
      return NextResponse.json({ message: "login success" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  }

  async logout_api() {
    const authStatus = await new Auth().logout();
    if (authStatus) {
      return NextResponse.json({ message: "logout success" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "logout unsuccessful with errors" },
        { status: 500 }
      );
    }
  }

  async session_renew_api() {
    const newSession = await new Auth().renew_session();
    if (!newSession) {
      console.error("error in session");
      return NextResponse.json(
        { message: "error creating session" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "session renewed" }, { status: 200 });
  }

  async get_session_api() {
    const session = await new Auth().validate_session();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized: No session" },
        { status: 401 }
      );
    }

    const accessToken = session?.accessToken;
    if (!accessToken) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid session" },
        { status: 401 }
      );
    }

    return NextResponse.json({ accessToken }, { status: 200 });
  }
}

export default AuthApi;
