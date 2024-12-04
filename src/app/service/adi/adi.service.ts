import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';
import { IAdiRegistrationData } from 'src/app/interface/register/IAdiRegistrationData.interface';
import { IAdiResponse } from 'src/app/interface/response/IAdiResponse.interface';
import { IAdisReponse } from 'src/app/interface/response/IAdisResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AdiService {
  constructor(private http: HttpClient) {}

  registerAdi(data: IAdiRegistrationData): Observable<CreateResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<CreateResponse>(`${environment.apiUrl}teachers/me/evaluations`, data, { headers });
  }

  getAdi(id: number): Observable<IAdiResponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IAdiResponse>(`${environment.apiUrl}students/evaluations/${id}/show`, { headers });
  }

  getAdis(studentId: number): Observable<IAdisReponse> {
    const token = localStorage.getItem('@civitas:token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IAdisReponse>(`${environment.apiUrl}students/students/${studentId}/details`, { headers });
  }
}
