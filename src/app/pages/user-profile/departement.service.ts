import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Etudiants } from 'src/app/Model/Etudiants';
import { Departement } from 'src/app/Model/Departement';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getDep(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.apiServerUrl}/department/getAll`);
  }

public addDep(etudiant:Departement):Observable<Departement>{
  return this.http.post<Departement>(`${this.apiServerUrl}/department/add`,etudiant);
}


public deleteDep(etudiantId:number):Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/department/deleteDepartement/${etudiantId}`)
}

getDepById(idEtud:number):Observable<Departement>{
  console.log("get dep");
  return this.http.get<Departement>(`${this.apiServerUrl}/department/getDepartement/${idEtud}`);
}



}
