export interface IClassResponse {
  id: number,
  name: string,
  schoolYear: string,
  schoolShift: string,
  educationType: string,
  students: Students,
  teacherClass: teacherClass[]
}

interface Students {
  id: number,
  fullName: string,
  document: string,
  registrationNumber: string,
  cpfGuardian: string
}

interface teacherClass {
  id: number,
  fullName: string,
  cpf: string
}
