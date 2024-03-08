import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guard/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CategoriesDetailsComponent } from './categories-details/categories-details.component';
import { BrandsDetailsComponent } from './brands-details/brands-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetComponent } from './components/forget/forget.component';

const routes: Routes = [
  {path:"",
  canActivate:[authGuard],
  component:BlankLayoutComponent,children:[
    {path:"",redirectTo:'home',pathMatch:'full'},
    {path:"home",component:HomeComponent,title:"Home"},
    {path:"home/details/:id",component:DetailsComponent,title:"Details"},
    {path:"products/details/:id",component:DetailsComponent,title:"Details"},
    {path:"categories/categoriesDetails/:id",component:CategoriesDetailsComponent,title:"Categories details"},
    {path:"cart",component:CartComponent,title:"Cart"},
    {path:"wishlist",component:WishlistComponent,title:"Wishlist"},
    {path:"products",component:ProductsComponent,title:"Products"},
    {path:"forgotpassword",component:ForgetComponent,title:"Forgot password"},
    {path:"allorders",component:AllordersComponent,title:"All orders"},
    {path:"checkout/:id",component:CheckoutComponent,title:"Checkout"},
    {path:"categories",component:CategoriesComponent,title:"Categories"},
    {path:"brands",component:BrandsComponent,title:"Brands"},
    {path:"brands/brandsDetails/:id",component:BrandsDetailsComponent,title:"Brands details"}

  ]},
  {path:"",component:AuthLayoutComponent,children:[
    {path:"login",component:LoginComponent,title:"login"},
    {path:"register",component:RegisterComponent,title:"Register"},
    {path:"forgotPassword",component:ForgetComponent,title:"Forgot password"}
  ]},
  {path:"**",component:NotfoundComponent,title:"404 Not Found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
