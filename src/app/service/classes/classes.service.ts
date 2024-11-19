import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export interface ClassRegistrationData {
  name: string;
  schoolYear: string;
  schoolShift: string;
  educationType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  constructor(private http: HttpClient) {}

  registerClass(data: ClassRegistrationData): Observable<any> {
    // Recupera o token do localStorage
    const token = localStorage.getItem('token');

    // Define os headers, incluindo o Authorization com o token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${environment.apiUrl}classes/create`, data, { headers });
  }

  // Novo método para obter a lista de classes
  getClasses(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${environment.apiUrl}classes`, { headers });
  }
}
