import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotService } from 'src/app/shared/services/forgot.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent {

  constructor( private _ForgotService:ForgotService, private _Router:Router){}



step1:boolean=true;
step2:boolean=false;
step3:boolean=false;

msg:string='';

email:string='';

forgotPasswordForm:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email])
})

resetCodeForm:FormGroup=new FormGroup({
  resetCode:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(6)])
})

newPasswordForm:FormGroup=new FormGroup({
  newPassword:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
})



forgotPassword():void{
  let userEmail=this.forgotPasswordForm.value;
  this.email=userEmail.email;

  this._ForgotService.forgotPassword(userEmail).subscribe({
    next:(response)=>{
      this.msg=response.message;
      this.step1=false;
      this.step2=true

    },
    error:(err)=>{
      this.msg=err.error.message;
    }
  })



}


resetCode():void{
let resetCode=this.resetCodeForm.value;
console.log(
  resetCode
);

this._ForgotService.resetCode(resetCode).subscribe({
  next:(response)=>{
    this.msg=response.status;
    this.step2=false;
    this.step3=true;
  },
  error:(err)=>{
    this.msg=err.error.message;
  }
})

}


newPassword():void{

  let resetPasswordForm=this.newPasswordForm.value;

  resetPasswordForm.email=this.email;

  this._ForgotService.resetPassword(resetPasswordForm).subscribe({
    next:(response)=>{

      if(response.token){

        localStorage.setItem('eToken',response.token);

        this._Router.navigate(['/home']);
      }
    },
    error:(err)=>{
      this.msg=err.error.message;
    }
  })


}

}
