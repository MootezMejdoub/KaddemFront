import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Etudiants } from 'src/app/Model/Etudiants';
import { EtudiantsService } from './etudiants.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  public etudiants:Etudiants[];
  public deleteEmployee: Etudiants;
  public editEmployee: Etudiants;
  nbgamix:number=0;
  nbsim:number=0;
  nbse:number=0;
  nbnids:number=0;
  nbtotal:number=0;
  public focus;
  searchT:string='';
  searchedEtudiants:Etudiants[];
  totalRecords:any;
  page:number;
  constructor(private etudiantService:EtudiantsService) { }

  public getEtudiants():void{
    this.etudiantService.getEmployees().subscribe(
      (response: Etudiants[]) => {
        this.etudiants = response;
        console.log(this.etudiants);
        this.nbrOption();
        this.totalRecords= this.etudiants.length;
        console.log(this.totalRecords);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteEmloyee(employeeId: number): void {
    this.etudiantService.deleteEtudiants(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEtudiants();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.etudiantService.addEtudiants(addForm.value).subscribe(
      (response: Etudiants) => {
        console.log(response);
        this.getEtudiants();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  nbrOption(){
    for(let i=0; i<this.etudiants.length; i++){
      if(this.etudiants[i].option==="gamix")
        this.nbgamix++;
      if(this.etudiants[i].option==="sim")
        this.nbsim++;
        if(this.etudiants[i].option==="se")
          this.nbse++;
          if(this.etudiants[i].option==="nids")
            this.nbnids++;
    }
    this.nbtotal=this.nbgamix+this.nbsim+this.nbse+this.nbnids
  }


  public onOpenModal(employee: Etudiants, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateStudentModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }
  public onUpdateEtudiant(etud: Etudiants,id:number): void {
    this.etudiantService.updateEtudiants(etud,id).subscribe(
      (response: Etudiants) => {
        console.log(response);
        this.getEtudiants();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }

    ngOnInit(): void {
     this.getEtudiants();

    }

    onsearch(searchValue:string){

      this.searchT = searchValue;
      console.log(searchValue);

    }

  }
