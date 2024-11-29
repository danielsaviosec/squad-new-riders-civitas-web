export interface TeachersResponse {
  id: number,
  cpf: number,
  fullName: string,
  registrationNumber: string,
  classes: Class[]
}

interface Class {
  id: number,
  name: string
}
