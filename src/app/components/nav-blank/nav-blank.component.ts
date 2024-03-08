import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {

  cartCount:number=0;
  favCount:number=0;

  constructor(private _AuthService:AuthService , private _CartService:CartService , private _Renderer2:Renderer2,private _WishlistService:WishlistService){}

  
  
  //number cart & wishlist
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.cartCount=data;
      }
    })

    this._CartService.getUserCart().subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems);
      }
    })



    this._WishlistService.favCount.subscribe({
      next:(data)=>{
        this.favCount=data;
      }
    })

    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        this._WishlistService.favCount.next(response.count)
      }
    })


    


}





logOutUser():void{  

  this._AuthService.logOut();

}




//event scroll
@ViewChild('navbar') navEvent!:ElementRef;

@HostListener('window:scroll')
onScroll():void{
  if(scrollY > 400){
    this._Renderer2.addClass(this.navEvent.nativeElement,'px-3')

  }else{
    this._Renderer2.removeClass(this.navEvent.nativeElement,'px-3 ')

  }
}

}
