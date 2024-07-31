import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface Curso {
  id?: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = `${environment.apiBaseUrl}/cursos`;

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  createCurso(curso: Curso): Observable<Curso[]> {
    return this.http.post<Curso[]>(this.apiUrl, curso);
  }
}
