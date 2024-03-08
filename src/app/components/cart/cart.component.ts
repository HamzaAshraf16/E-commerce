import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService){}

  cartData:any={};

  removeItem(productId:string):void{
    this._CartService.removeItemCart(productId).subscribe({
      next:(response)=>{
      this._CartService.cartNumber.next(response.numOfCartItems)
      this.cartData=response.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  changeCount(productId:string , count:number):void{
    if(count >= 1){

      this._CartService.updateCart(productId,count).subscribe({
        next:(response)=>{
          this.cartData=response.data
        },
        error:(err)=>{console.log(err);}
      });

    }
    

  }

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(response)=>{
        
        this.cartData=response.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


}
