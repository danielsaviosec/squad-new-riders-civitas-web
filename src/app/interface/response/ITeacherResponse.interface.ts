export interface ITeacherResponse {
  id: number,
  fullName: string,
  cpf: string,
  teacherClasses: teacherClasses[],
  registrationNumber: string
}

export interface teacherClasses {
  id: number,
  name?: string,
  schoolYear?: string,
  schoolShift?: string,
  educationType?: string,
}
