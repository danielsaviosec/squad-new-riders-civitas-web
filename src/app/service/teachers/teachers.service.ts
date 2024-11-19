import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export interface TeacherRegistrationData {
  fullName: string;
  cpf: string;
  registrationNumber: string;
  classes: number[];
}

export interface Teacher {
  fullName: string;
  registrationNumber: string;
  classes: Class[];
}

export interface Class {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  // Função para cadastrar professor
  registerTeacher(data: TeacherRegistrationData): Observable<any> {
    console.log(data);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${environment.apiUrl}teachers/register`, data, { headers });
  }

  // Função para listar professores
  getTeachers(): Observable<Teacher[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Teacher[]>(`${environment.apiUrl}admin/teachers/all`, { headers });
  }
}
