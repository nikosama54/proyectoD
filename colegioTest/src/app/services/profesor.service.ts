import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private apiUrl = `${environment.apiBaseUrl}/profesores`;
  constructor(private http: HttpClient) {}

  getProfesores(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createProfesor(profesor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, profesor);
  }
}
