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
   // this.id=this.ac.snapshot.params['id'];
   //this.ac.paramMap.subscribe(result=>{console.log(result); this.id=+result.get('id')});
   //console.log(this.id);
   let et:Etudiants;
this.getDepartements();

    this.ac.paramMap.subscribe(params=>{
      this.id=+params.get('id');
      if (this.id){
        //update
        this.us.getEtudiant(this.id).subscribe(
          res=>{
           this.etudiantedit=res,
           this.createForm(this.etudiantedit)}
           )


      }}
      )}




   // let myUser=new User();

   createForm(etudiantedit){
    this.myForm=new FormGroup({
      autres:new FormGroup({
      nomE:new FormControl(etudiantedit.nomE, [Validators.required, Validators.minLength(3)]),
      option:new FormControl(etudiantedit.option, Validators.required),
      prenomE:new FormControl(etudiantedit.prenomE,[Validators.required, Validators.minLength(3)]),
     nomDepart:new FormControl(etudiantedit.deptt.nomDepart)
    }),

    })
  }




  saveUser(){
    this.etudiantedit.nomE=  this.myForm.controls['autres'].get('nomE').value;
    this.etudiantedit.prenomE=  this.myForm.controls['autres'].get('prenomE').value;
    this.etudiantedit.option=  this.myForm.controls['autres'].get('option').value;
    this.etudiantedit.deptt.nomDepart=  this.myForm.controls['autres'].get('nomDepart').value;
    console.log(this.myForm.controls['autres'].get('nomDepart').value);

  //this.list.push(this.user);
 // console.log(this.list);
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
      this.us.assigneEtudToDepart( this.etudiantedit.idEtudiant,this.myForm.controls['autres'].get('nomDepart').value).subscribe(ress=>{
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
        console.log(this.listDeparts);

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
