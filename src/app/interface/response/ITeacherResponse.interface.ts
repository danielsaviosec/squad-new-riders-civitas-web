export interface ITeacherResponse {
  id: number,
  fullName: string,
  cpf: string,
  teacherClasses: teacherClasses[],
  registrationNumber: string
}

interface teacherClasses {
  id: number
}
