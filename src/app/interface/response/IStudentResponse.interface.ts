export interface IStudentResponse {
  id: number,
  fullName: string,
  document: string,
  registrationNumber: string,
  cpfGuardian: string,
  studentClass: studentClass
}

interface studentClass {
  id: number,
  name: string,
  schoolYear: string,
  schoolShift: string,
  educationType: string
}
