import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../product.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";

@HostListener('window: resize', ['$event'])
@Component({
  selector: 'app-manage-product-type',
  templateUrl: './manage-product-type.component.html',
  styleUrls: ['./manage-product-type.component.css']
})

@HostListener('window: resize', ['$event'])
export class ManageProductTypeComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public productTypes = [];
  public addProductTypeForm: FormGroup;

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
    // Add ProductType  Form Validation
    this.addProductTypeForm = this.formBuilder.group({
      productName: ["", [Validators.required]],
      productType: ["", [Validators.required]],
      version: ["", [Validators.required]],
      farmerCategory: ["", [Validators.required]],
      rate: ["", [Validators.required]],
      loading: ["", [Validators.required]],
      loadingRate: ["", [Validators.required]],
      productMatrix: ["", [Validators.required]],
      documents: ["", [Validators.required]],
    });

    this.listProduct();
  }


  //  Endpoints
//  1. get Product Types
  public listProduct(): void {
    this.ps.getproductType('').subscribe((data) => {
      // @ts-ignore
      this.productTypes = data;
      this.dtTrigger.next();
      this.rows = this.productTypes;
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

//  2. Add Product Type
  public addProductType() {
    if(this.addProductTypeForm.invalid){
      this.markFormGroupTouched(this.addProductTypeForm)
      return
    }
    let newProductType = {
      productName: this.addProductTypeForm.value.productName,
      productType: this.addProductTypeForm.value.productType,
      version: this.addProductTypeForm.value.version,
      farmerCategory: this.addProductTypeForm.value.farmerCategory,
      rate: this.addProductTypeForm.value.rate,
      loading: this.addProductTypeForm.value.loading,
      loadingRate: this.addProductTypeForm.value.loadingRate,
      productMatrix: this.addProductTypeForm.value.productMatrix,
      document: this.addProductTypeForm.value.document,
    };
    this.ps.addProduct('', newProductType).subscribe();
    this.listProduct();
    this.addProductTypeForm.reset();
    // @ts-ignore
    $("#add_product_type").modal("hide");
    this.toastr.success("Product Type added sucessfully...!", "Success");
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
