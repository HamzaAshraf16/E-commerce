import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from '../shared/services/ecomdata.service';

@Component({
  selector: 'app-brands-details',
  templateUrl: './brands-details.component.html',
  styleUrls: ['./brands-details.component.css']
})
export class BrandsDetailsComponent implements OnInit{
  constructor( private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService){}
  
  brandsDetails:any=[];
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let idBrands:any=params.get('id');
  
        this._EcomdataService.getSpecificbrand(idBrands).subscribe({
          next:(response)=>{
            this.brandsDetails=response.data;
          }
        })
  }
    })
  }
}
