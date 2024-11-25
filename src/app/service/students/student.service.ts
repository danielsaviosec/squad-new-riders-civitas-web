import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { StudentRegistrationData } from 'src/app/interface/register/StudentRegistrationData.interface';
import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';
import { IStudentResponse } from 'src/app/interface/response/IStudentsResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  registerStudent(data: StudentRegistrationData): Observable<CreateResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<CreateResponse>(`${environment.apiUrl}students/register`, data, { headers });
  }

  // Função para listar professores
  getStudents(): Observable<IStudentResponse[]> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IStudentResponse[]>(`${environment.apiUrl}admin/me/students`, { headers });
  }
}
