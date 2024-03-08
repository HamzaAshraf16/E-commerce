import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute, private _CartService:CartService){}

  isLoading:boolean=false;
  cartId:any='';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId =params.get('id');        
      }
    })
  }


  checkout:FormGroup=new FormGroup({
    details:new FormControl('',[Validators.required,Validators.minLength(50),Validators.maxLength(255)]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
  })

  handleForm():void{

    this._CartService.checkout(this.cartId,this.checkout.value).subscribe({
      next:(response)=>{
        if(response.status== "success"){
          window.open(response.session.url,'_self')
         }
      }
    })

    
  }
}
