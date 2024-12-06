export interface IStudentResponse {
  id: number,
  fullName: string,
  document: string,
  registrationNumber: string,
  cpfGuardian: string,
  createdAt: string,
  updatedAt: string,
  studentClass: Class
}

interface Class {
  id: number,
  name: string
}
