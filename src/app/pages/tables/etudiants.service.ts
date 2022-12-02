import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Etudiants } from 'src/app/Model/Etudiants';


@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getEmployees(): Observable<Etudiants[]> {
    return this.http.get<Etudiants[]>(`${this.apiServerUrl}/etudiants/getAllEtudiant`);
  }

public addEtudiants(etudiant:Etudiants):Observable<Etudiants>{
  return this.http.post<Etudiants>(`${this.apiServerUrl}/etudiants/addEtudiant`,etudiant);
}


public deleteEtudiants(etudiantId:number):Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/etudiants/deleteEtudiant/${etudiantId}`)
}
public updateEtudiants(etud:Etudiants,etudid:number):Observable<Etudiants>{
  return this.http.put<Etudiants>(`${this.apiServerUrl}/etudiants/updateEtud/${etudid}`,etud);

}
getEtudiant(idEtud:number):Observable<Etudiants>{
  console.log("get etud");
  return this.http.get<Etudiants>(`${this.apiServerUrl}/etudiants/getEtudiant/${idEtud}`);
}
public assigneEtudToDepart(idEtud:number,idDep:number):Observable<Etudiants>{
  console.log("assign dep");console.log(idDep);
  return this.http.put<Etudiants>(`${this.apiServerUrl}/etudiants/asign/${idEtud}/${idDep}`,null);

}
}
