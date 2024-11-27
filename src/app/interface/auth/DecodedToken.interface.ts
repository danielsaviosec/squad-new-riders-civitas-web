import { JwtPayload } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  id: number,
  email: string,
  role?: string,
  schoolId?: number,
  iat: number,
  exp: number
}
