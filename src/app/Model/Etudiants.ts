import { Contrat } from "./Contrat";
import { Departement } from "./Departement";

export interface Etudiants{


     idEtudiant:number,
      nomE:String,

       prenomE:String,
       deptt:Departement;
       cont:Contrat;
       option:any,


}
