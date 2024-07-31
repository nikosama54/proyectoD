import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private apiUrl = `${environment.apiBaseUrl}/notas`;
  constructor(private http: HttpClient) {}

  getNotas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createNotas(Notas: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, Notas);
  }

  updateNotas(id: number, Notas: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, Notas);
  }

  deleteNotas(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
