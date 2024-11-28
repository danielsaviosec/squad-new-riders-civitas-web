import { Class } from "./Class.interface";

export interface Teacher {
  id: number,
  fullName: string;
  registrationNumber: string;
  classes: Class[];
}
