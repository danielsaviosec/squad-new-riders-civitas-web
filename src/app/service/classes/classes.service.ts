import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { ClassRegistrationData } from 'src/app/interface/register/ClassRegistrationData.interface';
import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';
import { ClassesResponse } from 'src/app/interface/response/ClassesResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  constructor(private http: HttpClient) {}

  registerClass(data: ClassRegistrationData): Observable<CreateResponse> {
    // Recupera o token do localStorage
    const token = localStorage.getItem('@civitas:token');

    // Define os headers, incluindo o Authorization com o token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<CreateResponse>(`${environment.apiUrl}classes/create`, data, { headers });
  }

  // Novo método para obter a lista de classes
  getClasses(): Observable<ClassesResponse[]> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ClassesResponse[]>(`${environment.apiUrl}classes`, { headers });
  }
}
