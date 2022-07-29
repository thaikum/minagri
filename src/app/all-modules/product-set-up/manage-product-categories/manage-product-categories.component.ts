import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../product.service";
import {FormGroup, FormBuilder, Validators, NgForm} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";


@HostListener('window: resize', ['$event'])
@Component({
  selector: 'app-manage-product-categories',
  templateUrl: './manage-product-categories.component.html',
  styleUrls: ['./manage-product-categories.component.css']
})

@HostListener('window: resize', ['$event'])
export class ManageProductCategoriesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public products = [];
  public addProductForm: FormGroup;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  public innerHeight: any;

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(http: HttpClient, public ps: ProductService,private formBuilder: FormBuilder,private toastr: ToastrService,) {}

  ngOnInit() {
    $(document).ready(function () {
      // @ts-ignore
      $('[data-bs-toggle="tooltip"]').tooltip();
    });
    // Add ProductForm Validation
    this.addProductForm = this.formBuilder.group({
      categoryName: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
    this.getCategory();
  }


  //  Endpoints
//  1. get Product Categories
  public getCategory(): void {
    this.ps.getCategory('/products/listcategory').subscribe((data) => {
      // @ts-ignore
      this.products = data;
      this.dtTrigger.next();
      this.rows = this.products;
      this.srch = [...this.rows];
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

//  2. Add Product Category
  public addProduct() {
    if(this.addProductForm.invalid){
      this.markFormGroupTouched(this.addProductForm)
      return
    }
    let newProduct = {
      productName: this.addProductForm.value.productName,
      contractName: this.addProductForm.value.contractName,
    };
    this.ps.addProduct('', newProduct).subscribe();
    this.getCategory();
    this.addProductForm.reset();
    // @ts-ignore
    $("#add_product").modal("hide");
    this.toastr.success("Contract Review added sucessfully...!", "Success");
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

