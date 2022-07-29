import {Component, HostListener, NgZone, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../product.service";
import {FormBuilder, NgForm} from "@angular/forms";

interface Category {
}

@Component({
  selector: 'app-manage-product-categories',
  templateUrl: './manage-product-categories.component.html',
  styleUrls: ['./manage-product-categories.component.css']
})

@HostListener('window: resize', ['$event'])
export class ManageProductCategoriesComponent implements OnInit {

  public innerHeight: any;

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(private ngZone: NgZone,http: HttpClient, public ps: ProductService,private formBuilder: FormBuilder) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
    this.getCategory();
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

  deleteTicket() {

  }

  //  Endpoints
//  1. get Product Categories
  public getCategory(): void{
    this.ps.getCategory('/products/listcategory').subscribe((response:any) => {
      console.log(response)
    })
  }

//  2. Add Product Category
  public onAddProduct(addForm: NgForm): void {
    this.ps.addCategory('',addForm.value).subscribe(
      (response:Category) => {
        console.log(response);
        this.getCategory();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
}

