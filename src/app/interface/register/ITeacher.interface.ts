import { IClass } from "./IClass.interface";

export interface ITeacher {
    fullName: string;
    registrationNumber: string;
    classes: IClass[];
}