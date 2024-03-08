import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading:boolean=false;

  msgErorr:string='';

constructor(private _AuthService:AuthService , private _Router:Router){}

  registerForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },{validators:[this.confirmPassword]} as FormControlOptions);

  handelform():void{
    this.isLoading=true;


    if(this.registerForm.valid){
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next:(response)=>{
          this.isLoading=false;

          this._Router.navigate(['/login']);
                },
        error:(err:HttpErrorResponse)=>{
          this.isLoading=false;

          this.msgErorr=err.error.message;          
        }
      })
  
    }
  }


  confirmPassword( group:FormGroup ):void{
    let password=group.get('password');
    let rePassword=group.get('rePassword');

    if(rePassword?.value == ''){

      rePassword?.setErrors({required:true})

    }else if(password?.value != rePassword?.value)
    {
      rePassword?.setErrors({mismatch:true})

    }

  }



}
