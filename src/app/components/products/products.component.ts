import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

constructor(private _EcomdataService:EcomdataService , private _CartService:CartService , private _ToastrService:ToastrService , private _WishlistService:WishlistService){}
products:Product[]=[];

categories:any[]=[];

searchTerm:string='';

addCart(productId:string):void{
  this._CartService.addToCart(productId).subscribe({
    next:(response)=>{
      this._CartService.cartNumber.next(response.numOfCartItems);
      this._ToastrService.success("Product added");
    },
    error:(err)=>{console.log(err);}
  })
}



 ngOnInit(): void {
  //get products

  this._EcomdataService.getAllProduct().subscribe({
    next:(response)=>{
      this.products=response.data;
      this.pageSize=response.metadata.limit;
      this.currentPage=response.metadata.currentPage;
      this.total=response.results;
    },
    error:(errorResponse)=>{
      console.log(errorResponse);
    }
  })

  this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
      const newData=response.data.map((item:any)=> item._id);
      this.wishListData=newData;    
    }
  })
}





// wishlist

wishListData:string[]=[];

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
      this.wishListData=response.data

    }
  })

}

//end wishList







//pagination
pageSize:number=0;
currentPage:number=1;
total:number=0;
pageChanged(event:any):void{
  this._EcomdataService.getAllProduct(event).subscribe({
    next:(response)=>{
      this.products=response.data;
      this.pageSize=response.metadata.limit;
      this.currentPage=response.metadata.currentPage;
      this.total=response.results;
    },
    error:(errorResponse)=>{
    }
  })
}

}
