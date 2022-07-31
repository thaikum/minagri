import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../product.service";
import {FormGroup, FormBuilder, Validators, NgForm} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import {Categories} from "../interface/categories";


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
  public products: Categories[];
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

  constructor(public ps: ProductService,private formBuilder: FormBuilder,private toastr: ToastrService,) {}

  ngOnInit() {
    $(document).ready(function () {
      // @ts-ignore
      $('[data-bs-toggle="tooltip"]').tooltip();
    });
    // Add ProductForm Validation
    this.addProductForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
    this.getCategory();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table
  rerender(): void {
    $('#datatable').DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.products = [];
    this.getCategory();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }


  //  Endpoints
//  1. get Product Categories
  public getCategory() {
    this.ps.getAllCategory().subscribe(data => {
      this.products = data.body;
      console.log(this.products)
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
      name: this.addProductForm.value.name,
      description: this.addProductForm.value.description,
    };
    // @ts-ignore
    this.ps.addProduct(newProduct).subscribe((data) => {
      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getCategory();
    this.addProductForm.reset();
    // @ts-ignore
    $("#add_product").modal("hide");
    this.toastr.success("Contract Review added sucessfully...!", "Success");
  }

  // search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

