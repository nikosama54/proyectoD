import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {
  private apiUrl = `${environment.apiBaseUrl}/materias`;
  constructor(private http: HttpClient) {}

  getMaterias(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createMateria(materia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, materia);
  }
}
