import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Etudiants } from 'src/app/Model/Etudiants';

import { Equipe } from 'src/app/Model/Equipe';


@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getEqui(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.apiServerUrl}/getAllEquipes`);
  }


getEquipeById(idEtud:number):Observable<Equipe>{
  console.log("get Equi");
  return this.http.get<Equipe>(`${this.apiServerUrl}/getEquipe/${idEtud}`);
}



}
