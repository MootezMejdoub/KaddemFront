import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Etudiants } from 'src/app/Model/Etudiants';

import { Contrat } from 'src/app/Model/Contrat';


@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getCont(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiServerUrl}/contrat/getAll`);
  }

public addCont(etudiant:Contrat):Observable<Contrat>{
  return this.http.post<Contrat>(`${this.apiServerUrl}/contrat/add`,etudiant);
}


public deleteCont(etudiantId:number):Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/contrat/deleteContrat/${etudiantId}`)
}

getContratById(idEtud:number):Observable<Contrat>{
  console.log("get cont");
  return this.http.get<Contrat>(`${this.apiServerUrl}/contrat/getContrat/${idEtud}`);
}



}
