export interface ClassesResponse {
    id: number,
    name: string,
    schoolYear: string,
    schoolShift: string,
    educationType: string,
    createdAt: string,
    updatedAt: string,
    school: School[];
}

interface School {
  id: number,
  name: string,
  address: string,
  createdAt: string,
  updatedAt: string
}
