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
  name: string
}
