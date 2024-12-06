export interface IAdiResponse {
  id: number,
  date: string,
  label: string,
  formattedLabel?: string,
  student: Student,
  reviews: Reviews,
  teacherComments: string
}

interface Student {
  id: number,
  fullName: string,
  studentClass: string
}

export interface Reviews {
  selfAwareness: number,
  empathy: number,
  communication: number,
  teamwork: number,
  autonomy: number
}
