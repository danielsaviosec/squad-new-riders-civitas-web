import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { TeacherRegistrationData } from 'src/app/interface/register/TeacherRegistrationData.interface';
import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';
import { TeachersResponse } from 'src/app/interface/response/TeachersResponse.interface';
import { ITeacherResponse } from 'src/app/interface/response/ITeacherResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  // Função para cadastrar professor
  registerTeacher(data: TeacherRegistrationData): Observable<CreateResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<CreateResponse>(`${environment.apiUrl}teachers/register`, data, { headers });
  }

  getTeacherByToken(): Observable<ITeacherResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ITeacherResponse>(`${environment.apiUrl}teachers`, { headers });
  }

  getTeacher(id: number): Observable<ITeacherResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ITeacherResponse>(`${environment.apiUrl}teachers/${id}`, { headers });
  }

  // Função para listar professores
  getTeachers(): Observable<TeachersResponse[]> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TeachersResponse[]>(`${environment.apiUrl}admin/teachers/all`, { headers });
  }

  // Novo método para atualizar professor
  updateTeacher(id: number, data: TeacherRegistrationData): Observable<CreateResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<CreateResponse>(`${environment.apiUrl}admin/teachers/${id}`, data, { headers });
  }

  // Novo método para excluir o professor
  deleteTeacher(id: number): Observable<CreateResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<CreateResponse>(`${environment.apiUrl}admin/teachers/${id}`, { headers });
  }
}
