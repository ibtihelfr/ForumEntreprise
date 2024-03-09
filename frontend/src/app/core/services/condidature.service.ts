import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Condidature } from '../models/condidature'

@Injectable({
  providedIn: 'root'
})
export class CondidatureService {
  private baseUrl = 'http://localhost:9090'; // Base URL of your Spring Boot backend

  constructor(private http: HttpClient) { }

  getAllCondidatures(): Observable<Condidature[]> {
    return this.http.get<Condidature[]>(`${this.baseUrl}/condidature/all`);
  }


  addCondidature(condidature: Condidature, idOffer: number, id: number): Observable<Condidature> {
    return this.http.post<Condidature>(`${this.baseUrl}/condidature/add/${idOffer}/${id}`, condidature);
  }
  updateCondidature(condidature: Condidature): Observable<Condidature> {
    return this.http.put<Condidature>(`${this.baseUrl}/condidature/update`, condidature);
  }
      
  deleteCondidature(idCondidature: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/condidature/delete/${idCondidature}`);
  } 
}
