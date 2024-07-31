import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private apiUrl = `${environment.apiBaseUrl}/estudiantes`;
  constructor(private http: HttpClient) {}

  getEstudiantes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getEstudiante(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEstudiante(estudiante: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, estudiante);
  }

  updateEstudiante(id: number, estudiante: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, estudiante);
  }

  deleteEstudiante(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
