import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  jobRegister:FormGroup;
  errorMsg:String;
  disable=true;
  user:any;
  
  constructor(private formbuilder:UntypedFormBuilder,private loginService:LoginService) { }
  

  ngOnInit(): void {
    this.getUserDetails();
    
    
  }
  load(){
    this.jobRegister= this.formbuilder.group({
      'firstName': new UntypedFormControl({value:this.user.firstName,disabled:true},Validators.required),
      'lastName': new UntypedFormControl({value:this.user.lastName,disabled:true},Validators.required),
      'email': new UntypedFormControl({value:this.user.email,disabled:true},[Validators.required,Validators.email]),
      'oldPword': new UntypedFormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]),
      'password': new UntypedFormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      'confirmPassword': new UntypedFormControl('',Validators.required)
    }, {
      validator: this.checkMatchingPassword("password", "confirmPassword")
    }
    )

  }
  checkMatchingPassword(pass: string, passConfirm: string) {
    return (group: UntypedFormGroup) => {
      let password = group.controls[pass]
      let confirm = group.controls[passConfirm]

      if(password.value == confirm.value) {
        return;
      } else {
        confirm.setErrors({
          notEqualToPassword: true
        })
      }
    }
  }
  getUserDetails(){
    let logged!: string;
    console.log("I have been called!");
    logged=localStorage.getItem("loggedEmail")!;
    console.log("this is working"+logged);
    this.loginService.getUser(logged).subscribe(
      response=>{
        console.log("console")
        this.user=response;
        this.load();
        
      },
      err=>{
        console.log(err);
      }
    )
  }
  onSubmit(){
    if(this.user.password==this.jobRegister.value.oldPword){
      this.updateUserDetails();
    }
    else{
      console.log()
      this.errorMsg="Incorrect Password! Please try again."

    }
  }
  updateUserDetails(){
    this.user.password=this.jobRegister.value.password;
    this.loginService.updateUser(this.user).subscribe(
      response=>{
        this.loginService.logout();
        window.location.reload();
      },
      err=>{
        console.log(err)
      }
    )

  }

}
