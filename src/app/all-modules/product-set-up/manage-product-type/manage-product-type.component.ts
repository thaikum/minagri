import { TypeList } from './../interface/typelist';
import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";

declare const $: any;
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
  public addProductForm: FormGroup;
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

  constructor(public ps: ProductService,private formBuilder: FormBuilder,private toastr: ToastrService,) {}

  ngOnInit() {
    $(document).ready(function () {
      // @ts-ignore
      $('[data-bs-toggle="tooltip"]').tooltip();
    });

    // Add Product Type validation
    this.addProductForm = this. formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
    })
 

    // for floating label
    $('.floating')
      .on('focus blur', function (e) {
        $(this)
          .parents('.form-focus')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');

    // Product Types
    this.productType();

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
    this.types = [];
    this.productType();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  


  //  Endpoints
  // get producttype list
  public productType() {
    this.ps.listProductType().subscribe(data => {
      this.types = data.body;
      this.rows = this.types;
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
  public addProduct() {
    if(this.addProductForm.invalid){
      this.markFormGroupTouched(this.addProductForm)
      return
    }
    let newProducttype = {
      name: this.addProductForm.value.name,
      description: this.addProductForm.value.description,
    };
   
    // @ts-ignore
    this.ps.addproductType(newProducttype).subscribe((data) => {
      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.productType();
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
  // search by Product ID
  searchID(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.id.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // getting the status value
  getStatus(data) {
    this.statusValue = data;
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // getProductName(id) {
  //   let typeArray=[];
  //   let index;    


  //   // console.log('this.types');
  //   // console.log(this.types);


  //   // this.types.forEach(item => {
  //   //   if (item.id == itemIndex) {
  //   //     typeName = item.name;
  //   //     return item.name;
  //   //   }
  //   // })
  //   // return typeName;
    

  //   typeArray = this.types?.map((type, itemIndex) => {
  //     if(type.id === id) {
  //       index = itemIndex;
  //       return type.name;
  //     }
  //   })
  //   return typeArray[index];

  // }

  // // getting Farmer Category from farmercategorylist
  // getFarmerCategory(id) {
  //   let typeArray=[];
  //   let index;
    
  //   typeArray = this.farmercategory?.map((type, itemIndex) => {
  //     if(type.id === id) {
  //       index = itemIndex;
  //       return type.name;
  //     }
  //   })
  //   return typeArray[index];

  // }

}
