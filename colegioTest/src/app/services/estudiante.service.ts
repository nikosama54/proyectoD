import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private apiUrl = `${environment.apiBaseUrl}/estudiantes`;
  constructor(private http: HttpClient) {}

  getEstudiantes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createEstudiante(estudiante: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, estudiante);
  }
}
