import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export interface StudentRegistrationData {
  fullName: string;
  document: string;
  registrationNumber: string;
  studentClass: string;
  cpfGuardian: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  registerStudent(data: StudentRegistrationData): Observable<any> {
    console.log(data);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${environment.apiUrl}students/register`, data, { headers });
  }
}
