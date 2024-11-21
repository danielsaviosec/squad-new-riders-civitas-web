import { Class } from "./Class.interface";

export interface Teacher {
  fullName: string;
  registrationNumber: string;
  classes: Class[];
}
