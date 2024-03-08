import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor( private _WishlistService:WishlistService , private _ToastrService:ToastrService , private _CartService:CartService){}

  products:Product[]=[];


  
  
  
  wishListData:string[]=[];

  


  ngOnInit(): void {

    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        console.log(response);
        
        this.products=response.data;
        const newData=response.data.map((item:any)=> item._id);
        this.wishListData=newData;
        
      }
    })
  }



  addWish(productId:string):void{

    this._WishlistService.addWishlist(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this.wishListData=response.data
      }
    })
  
  }
  
  removewish(productId:string):void{
  
    this._WishlistService.removeWishlist(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this.wishListData=response.data;

       const newProduct=this.products.filter((item)=> this.wishListData.includes(item._id));
       this.products=newProduct;
  
      }
    })
  
  }


  addCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
      },
      error:(err)=>{console.log(err);}
    })
  }

}
