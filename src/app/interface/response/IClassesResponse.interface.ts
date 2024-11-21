export interface IClassesResponse {
    id: number,
    name: string,
    schoolYear: string,
    schoolShift: string,
    educationType: string,
    createdAt: string,
    updatedAt: string,
    school: ISchool[];
}

interface ISchool {
    id: 1,
    name: string,
    address: string,
    createdAt: string,
    updatedAt: string
}