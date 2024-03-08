import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from '../shared/services/ecomdata.service';

@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css']
})
export class CategoriesDetailsComponent implements OnInit {
constructor( private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService){}

categoriesDetails:any={};

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      let idProduct:any=params.get('id');

      this._EcomdataService.getSpecificCategories(idProduct).subscribe({
        next:(response)=>{
          this.categoriesDetails=response.data;
        }
      })
}
  })
}
}
