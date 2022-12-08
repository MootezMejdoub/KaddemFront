import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Departement } from 'src/app/Model/Departement';
import { Etudiants } from 'src/app/Model/Etudiants';
import { EtudiantsService } from '../tables/etudiants.service';
import { DepartementService } from './departement.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private us:EtudiantsService, private ac:ActivatedRoute,private usd:DepartementService) { }
  id:number;
  etudiantedit:Etudiants;
  listDeparts:Departement[];
  myForm:FormGroup;
  a :number= 0;
  nbgamix:number=0;
  nbsim:number=0;
  nbse:number=0;
  nbnids:number=0;
  nbtotal:number=0;




  ngOnInit(): void {


this.getDepartements();

    this.ac.paramMap.subscribe(params=>{
      this.id=+params.get('id');
      console.log(this.id);

      if (this.id){
        //update
        this.us.getEtudiant(this.id).subscribe(
          res=>{
           this.etudiantedit=res,

          console.log(" in init ")
          console.log(this.etudiantedit)

          this.createForm(this.etudiantedit)}


           )

      }})

    }







      createForm(etudiantedit){
        if(this.etudiantedit.departement===null)
        {
          this.myForm=new FormGroup({
            autres:new FormGroup({
              nomE:new FormControl(etudiantedit.nomE,[Validators.required, Validators.minLength(3)]),
            option:new FormControl(etudiantedit.option, Validators.required),

            prenomE:new FormControl(etudiantedit.prenomE,[Validators.required, Validators.pattern("[a-zA-Z]*")]),
            idDepart:new FormControl('',Validators.required),



          }),

          });console.log("in formdepnull")

        }
        else{
          this.myForm=new FormGroup({
            autres:new FormGroup({
              nomE:new FormControl(etudiantedit.nomE,[Validators.required, Validators.minLength(3)]),
            option:new FormControl(etudiantedit.option, Validators.required),

            prenomE:new FormControl(etudiantedit.prenomE,[Validators.required, Validators.pattern("[a-zA-Z]*")]),
              idDepart:new FormControl(etudiantedit.departement.idDepart),




          }),

          });
        }

      }



  saveUser(){
    this.etudiantedit.nomE=  this.myForm.controls['autres'].get('nomE').value;
    this.etudiantedit.prenomE=  this.myForm.controls['autres'].get('prenomE').value;
    this.etudiantedit.option=  this.myForm.controls['autres'].get('option').value;
   // this.etudiantedit.departement.idDepart= this.myForm.controls['autres'].get('idDepart').value;
  //this.list.push(this.user);

 //this.user.idCustomer=100;
 //this.user.password="";
 //this.user.picture="";
 if(!this.id||!this.myForm.valid && this.a==0){
  this.buttonMoveLeft();
  this.a = 1;
  return false;
  }

  if(!this.id||!this.myForm.valid && this.a==1){
    this.buttonMoveRight();
  this.a = 2;
  return false;
  }

  if(!this.id||!this.myForm.valid && this.a==2){
    this.buttonMoveLeft();
  this.a = 1;
  return false;
  }

  if (this.id&&this.myForm.valid){



    this.us.updateEtudiants(this.etudiantedit,this.id).subscribe(ress=>{
      console.log("f west update etud");
      console.log(this.myForm.controls['autres'].get('idDepart').value)
      this.us.assigneEtudToDepart( this.etudiantedit.idEtudiant,this.myForm.controls['autres'].get('idDepart').value).subscribe(ress=>{
        this.us.getEmployees().subscribe();
      })

    });




      // document.getElementById('submit-btn').click();
      document.getElementById('submit-btn').style.cursor = 'pointer';
      return false;
  }


 else{
this.us.addEtudiants(this.etudiantedit).subscribe();

 }

  this.myForm.reset();
  }

  public getDepartements():void{
    this.usd.getDep().subscribe(
      (response: Departement[]) => {
        this.listDeparts = response;
        console.log(response);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }










   buttonMoveLeft(){

      const button = document.getElementById('submit-btn');
      button.style.transform = 'translateX(-160%)';

  };


   buttonMoveRight(){

      const button = document.getElementById('submit-btn');
      button.style.transform = 'translateX(0%)';

  };


   resetBtn(){
      const button = document.getElementById('submit-btn');
      button.style.transform = 'translateX(0%)';
  }





}
