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

  getStudent(id: number): Observable<IStudentResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IStudentResponse>(`${environment.apiUrl}students/${id}`, { headers });
  }

  // Função para listar professores
  getStudents(): Observable<IStudentResponse[]> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IStudentResponse[]>(`${environment.apiUrl}admin/me/students`, { headers });
  }

  // Novo método para atualizar o estudante
  updateStudent(id: number, data: StudentRegistrationData): Observable<CreateResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<CreateResponse>(`${environment.apiUrl}admin/students/${id}`, data, { headers });
  }

  getStudentsByClassId(classId: number): Observable<IStudentResponse[]> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IStudentResponse[]>(`${environment.apiUrl}teachers/me/classes/${classId}/students`, { headers });
  }

  // Novo método para excluir o estudante
  deleteStudent(id: number): Observable<CreateResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<CreateResponse>(`${environment.apiUrl}admin/students/${id}`, { headers });
  }
}
