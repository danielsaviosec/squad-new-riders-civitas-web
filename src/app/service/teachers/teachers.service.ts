import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { TeacherRegistrationData } from 'src/app/interface/register/TeacherRegistrationData.interface';
import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';
import { TeachersResponse } from 'src/app/interface/response/TeachersResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  // Função para cadastrar professor
  registerTeacher(data: TeacherRegistrationData): Observable<CreateResponse> {
    console.log(data);
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<CreateResponse>(`${environment.apiUrl}teachers/register`, data, { headers });
  }

  // Função para listar professores
  getTeachers(): Observable<TeachersResponse[]> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TeachersResponse[]>(`${environment.apiUrl}admin/teachers/all`, { headers });
  }
}
