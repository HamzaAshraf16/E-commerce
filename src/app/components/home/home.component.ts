import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
constructor(private _EcomdataService:EcomdataService , private _CartService:CartService , private _WishlistService:WishlistService, private _ToastrService:ToastrService){}
products:Product[]=[];

categories:any[]=[];

searchTerm:string='';

//slider
categoriesSliderOption: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  autoplay:true,
  navText: ['', ''],
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 3
    },
    740: {
      items: 4
    },
    940: {
      items: 6
    }
  },
  nav: false
}


mainSliderOption: OwlOptions = {
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

// end Slider





//add to cart
addCart(productId:string):void{
  this._CartService.addToCart(productId).subscribe({
    next:(response)=>{
      this._CartService.cartNumber.next(response.numOfCartItems);
     this._ToastrService.success(response.message);
    },
    error:(err)=>{console.log(err);}
  })
}
//end add to cart





// wishlist

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










//end wishList







 ngOnInit(): void {
  //get products
  this._EcomdataService.getAllProduct().subscribe({
    next:(response)=>{
      this.products=response.data;
    },
    error:(errorResponse)=>{
    }
  })
  

//get categories
  this._EcomdataService.getCategories().subscribe({
    next:(response)=>{
      this.categories=response.data;
      
    }
  })

this._WishlistService.getWishlist().subscribe({
  next:(response)=>{
    const newData=response.data.map((item:any)=> item._id);
    this.wishListData=newData;    
  }
})

}









}
