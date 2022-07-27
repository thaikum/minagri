import {Component, HostListener, NgZone, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../product.service";
import {NgForm} from "@angular/forms";

interface productType {
}

@Component({
  selector: 'app-manage-product-type',
  templateUrl: './manage-product-type.component.html',
  styleUrls: ['./manage-product-type.component.css']
})

@HostListener('window: resize', ['$event'])
export class ManageProductTypeComponent implements OnInit {

  public innerHeight: any;

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(private ngZone: NgZone,http: HttpClient, public ps: ProductService,) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
    this.getProduct();
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
  }



  //  Endpoints
//  1. get Product Types
  public getProduct(): void{
    this.ps.getType('').subscribe((response:any) => {
      console.log(response)
    })
  }

//  2. Add Product Type
  public onAddProduct(addForm: NgForm): void {
    this.ps.addCategory('',addForm.value).subscribe(
      (response:productType) => {
        console.log(response);
        this.getProduct();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
}
