import { JwtPayload } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  id: 1,
  email: string,
  role?: string,
  schoolId?: number,
  iat: number,
  exp: number
}
