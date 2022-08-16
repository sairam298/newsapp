import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  errorMsg:String;

  constructor(private formbuilder:UntypedFormBuilder,private loginService:LoginService) { }
  jobRegister: UntypedFormGroup;
  jobLogin: UntypedFormGroup;
  ngOnInit(): void {
    this.jobRegister= this.formbuilder.group({
      'firstName': new UntypedFormControl('',Validators.required),
      'lastName': new UntypedFormControl('',Validators.required),
      'email': new UntypedFormControl('',[Validators.required,Validators.email]),
      'password': new UntypedFormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      'confirmPassword': new UntypedFormControl('',Validators.required)
    }, {
      validator: this.checkMatchingPassword("password", "confirmPassword")
    })

    this.jobLogin=this.formbuilder.group({
      'email':new UntypedFormControl('',[Validators.required,Validators.email]),
      'password': new UntypedFormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    })
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

  get f() {
    return this.jobLogin.controls;
  }
  get g() {
    return this.jobRegister.controls;
  }
  registerUser(){
    console.log(this.jobRegister.getRawValue());
    this.loginService.registeruser(this.jobRegister.getRawValue()).subscribe(
      response=>{
        window.location.reload();
      },
      err=>{
        this.errorMsg=err.error;
        console.log(err);
      }
    )

  }
  onSubmit(){
    console.log("The form is submitted.");
    this.loginService.generatetoken(this.jobLogin.value.email,this.jobLogin.value.password).subscribe(
      response=>{
        console.log(response);
        this.loginService.loginUser(response)
        window.location.href="/Home";
      },
      err=>{
        this.errorMsg="Invalid Email/Password. Please try again or register.";
        console.log(err)
      }
    )

  }
}
