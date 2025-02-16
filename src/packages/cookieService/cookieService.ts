"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface CookieOptions {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export const getCookie = async (name: string) => {
  const cookieStore = cookies();
  return (await cookieStore).get(name)?.value || null;
};

export const setCookie = async (
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  const cookieStore = cookies();
  (await cookieStore).set(name, value, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    ...options,
  });
};

export const deleteCookie = async (name: string) => {
  const cookieStore = cookies();
  (await cookieStore).set(name, "", {
    path: "/",
    expires: new Date(0),
  });
};

export const updateCookie = async (
  name: string,
  value: string,
  options: CookieOptions = {}
): Promise<void> => {
  setCookie(name, value, options);
};

export const setResponseCookie = async (
  name: string,
  value: string,
  options: CookieOptions = {},
  response: NextResponse
) => {
  await response.cookies.set(name, value, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    ...options,
  });
  return response;
};
