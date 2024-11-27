export interface IUser {
  email: string;
  exp: number;
  iat: number,
  id: number,
  role: string,
  schoolId?: number,
  schoolName: string
}
