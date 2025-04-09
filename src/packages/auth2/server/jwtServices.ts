import { SignJWT, jwtVerify } from "jose";

export class JwtSession {
  private secretKey: Uint8Array;
  private defaultExpirationTime = 60 * 60 * 24 * 7;
  private defaultAlg = "HS256";

  constructor(secret: string) {
    this.secretKey = new TextEncoder().encode(secret);
  }

  async encrypt(
    data: any,
    expSeconds: number = this.defaultExpirationTime,
    alg: string = this.defaultAlg
  ): Promise<string> {
    return await new SignJWT({ data })
      .setProtectedHeader({ alg: alg })
      .setExpirationTime(`${expSeconds}s`)
      .sign(this.secretKey);
  }

  async decrypt(token: string): Promise<any | null> {
    try {
      const { payload } = await jwtVerify(token, this.secretKey);
      return payload.data;
    } catch (err) {
      console.error("JWT verification failed:", err);
      return null;
    }
  }
}
