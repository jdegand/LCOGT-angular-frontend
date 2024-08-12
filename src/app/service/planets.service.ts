import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entries } from '../entries';
import { Planet } from '../planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(private http: HttpClient) { }

  addPlanet(formObject: any) {
    return this.http.post<any>('http://localhost:8080/planets', formObject);
  }

  fetchPlanets(): Observable<Entries> {
    return this.http.get<Entries>('http://localhost:8080');
  }

  fetchPlanet(name: string) {
    return this.http.get<Planet>('http://localhost:8080/planets/detail/' + name);
  }
}
