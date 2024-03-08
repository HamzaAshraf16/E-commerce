import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor( private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService, private _CartService:CartService,private _WishlistService:WishlistService , private _ToastrService:ToastrService){}

  productDetailsSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    navText: ['', ''],
    items:1,
    nav: false
  }

  productDetails:Product={} as Product;
  isFav:boolean=false;

 

  addCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        console.log(response);
        this._CartService.cartNumber.next(response.numOfCartItems);

      },
      error:(err)=>{console.log(err);}
    })
  }


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let idProduct:any=params.get('id');

        this._EcomdataService.getProductDetails(idProduct).subscribe({
          next:(response)=>{
            this.productDetails=response.data;
          }
        })
  }
    })


    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        const newData=response.data.map((item:any)=> item._id);
        this.wishListData=newData;    
      }
    })
  }







wishListData:string[]=[];

addWish(productId:string):void{

  this._WishlistService.addWishlist(productId).subscribe({
    next:(response)=>{

       this._WishlistService.favCount.next(response.data.length);
      this._ToastrService.success(response.message);
      this.wishListData=response.data
    }
  })

}

removewish(productId:string):void{

  this._WishlistService.removeWishlist(productId).subscribe({
    next:(response)=>{
      this._WishlistService.favCount.next(response.data.length);
      this._ToastrService.success(response.message);
      this.wishListData=response.data

    }
  })

}
}

