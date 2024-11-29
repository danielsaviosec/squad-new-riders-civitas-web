export interface IAdisReponse {
  studentInfo: StudentInfo,
  evaluations: Evaluations[],
  latestEvaluation: LatestEvaluation
}

interface StudentInfo {
  fullName: string,
  className: string
}

interface Evaluations {
  id: number,
  date: string,
  label: string
}

interface LatestEvaluation {
  id: number,
  date: string,
  label: string,
  reviews: Reviews
}

interface Reviews {
  selfAwareness: number,
  empathy: number,
  communication: number,
  teamwork: number,
  autonomy: number
}
