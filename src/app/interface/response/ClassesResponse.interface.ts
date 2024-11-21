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
  id: 1,
  name: string,
  address: string,
  createdAt: string,
  updatedAt: string
}
