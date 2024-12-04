export interface CreateResponse {
  message: string;
  data?: Data;
  id?: number
}

interface Data {
  id: number;
}
