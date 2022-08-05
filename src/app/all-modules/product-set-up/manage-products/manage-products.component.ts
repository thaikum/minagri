import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import {ProductService} from "../product.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Product } from '../interface/product';
import { TypeList } from '../interface/typelist';
import { FarmerService } from '../../subsidy/services/farmer.service';

declare const $: any;
@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})

@HostListener('window: resize', ['$event'])
export class ManageProductsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public addProductForm: FormGroup;
  public products: Product[];
  public productcategory = [];
  public types: TypeList[];

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  public innerHeight: any;
  


  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(public ps: ProductService,public fs: FarmerService,private formBuilder: FormBuilder,private toastr: ToastrService,) { }

  ngOnInit() {
    $(document).ready(function () {
      // @ts-ignore
      $('[data-bs-toggle="tooltip"]').tooltip();
    });

    // Add Product Type validation
    this.addProductForm = this. formBuilder.group({
      name: ["", [Validators.required]],
      producttypeid: ["", [Validators.required]],
      productcategoryid: ["", [Validators.required]],
      version: ["", [Validators.required]],
      premiumrate: ["", [Validators.required]],
      
    })
 

    // for floating label
    $('.floating')
      .on('focus blur', function (e) {
        $(this)
          .parents('.form-focus')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');

    // All Product
    this.listProducts();
    // Product Types
    this.productType();
    //  Product Categories
    this.listProductCategory();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };
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
    this.listProducts();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }



  //  Endpoints
  // get producttype list
  public listProducts() {
    this.ps.getproductType().subscribe(data => {
      this.products = data.body;
      console.log(this.products)
      this.rows = this.products;
      this.srch = [...this.rows];
    });
  }

  // Farmer Category
  public listProductCategory() {
    this.ps.getAllCategory().subscribe(data => {
      this.productcategory = data.body;
      console.log('Product Category List');
      console.log(this.productcategory);
    });
  }
  // List Product
  // get producttype list
  public productType() {
    this.ps.listProductType().subscribe(data => {
      this.types = data.body;
      console.log('producttypeslist')
      console.log(this.types)
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
  public addProduct() {
    if(this.addProductForm.invalid){
      this.markFormGroupTouched(this.addProductForm)
      return
    }
    let newProduct = {
      name: this.addProductForm.value.name,
      producttypeid: this.addProductForm.value.producttypeid,
      productcategoryid: this.addProductForm.value.productcategoryid,
      version: this.addProductForm.value.version,
      premiumrate: this.addProductForm.value.premiumrate,
    };
   
    // @ts-ignore
    this.ps.addproductType(newProduct).subscribe((data) => {
      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.listProducts();
    this.addProductForm.reset();
    // @ts-ignore
    $("#add_product").modal("hide");
    this.toastr.success("Product Type added sucessfully...!", "Success");
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
  // search by Product Version
  searchVersion(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.version.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

   //search by Product Type
   searchbyType(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.producttypeid.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by Product Category
  searchbyCategory(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.productcategoryid.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // getting the status value
  getStatus(data) {
    this.statusValue = data;
  }


  // getting product name from peoducttypelists
  getProductName(id) {
    let typeArray=[];
    let index;
    
    typeArray = this.types?.map((type, itemIndex) => {
      if(type.id === id) {
        index = itemIndex;
        return type.name;
      }
    })
    return typeArray[index];

  }

  // getting Farmer Category from farmercategorylist
  getProductCategory(id) {
    let typeArray=[];
    let index;
    
    typeArray = this.productcategory?.map((type, itemIndex) => {
      if(type.id === id) {
        index = itemIndex;
        return type.name;
      }
    })
    return typeArray[index];

  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
