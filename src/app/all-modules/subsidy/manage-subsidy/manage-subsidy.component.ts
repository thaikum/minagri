
import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import {SubsidyService} from "../services/subsidy.service";
import { Subsidy } from '../interface/subsidy';
import { FarmerService } from '../services/farmer.service';
import { TypeList } from '../../product-set-up/interface/typelist';
import { ProductService } from '../../product-set-up/product.service';


declare const $: any;
@Component({
  selector: 'app-manage-subsidy',
  templateUrl: './manage-subsidy.component.html',
  styleUrls: ['./manage-subsidy.component.css']
})

@HostListener('window: resize', ['$event'])
export class ManageSubsidyComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public subsidy: Subsidy[] = [];
  public farmercategory = [];
  public addSubsidyForm: FormGroup;
  public types: TypeList[];

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  public innerHeight: any;
  name: any;
  id: any;


  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }


  constructor(private http: HttpClient,public ps: ProductService,public fs: FarmerService, public sb: SubsidyService,private formBuilder: FormBuilder,private toastr: ToastrService,) {}

  ngOnInit() {
    $('.floating')
      .on('focus blur', function (e) {
        $(this)
          .parents('.form-focus')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');
      //subsidies
    this.getSubsidy();
    // farmer category list
    this.listFarmerCategory();
    // pruduct types
    this.productType();

    // Add SubsidyForm Validation
    this.addSubsidyForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      producttypeid: ["", [Validators.required]],
      rate: ["", [Validators.required]],
      farmercategoryid: ["", [Validators.required]],
    });

    // for data table configuration
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
    this.subsidy = [];
    this.getSubsidy();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
//  Endpoints
//  1. get all Subsidies

  public getSubsidy() {
    this.sb.getAllSubsidies().subscribe(data =>{
      this.subsidy = data.body;
      console.log(this.subsidy);
      this.rows = this.subsidy;
      this.srch = [...this.rows];
    })
  }

  // Farmer Category
  public listFarmerCategory() {
    this.fs.getFarmerCategory().subscribe(data => {
      this.farmercategory = data.body;
      console.log('Farmer Category List');
      console.log(this.farmercategory);
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


//  2. Add susbsidy
  public addSubsidy() {
    if(this.addSubsidyForm.invalid){
      this.markFormGroupTouched(this.addSubsidyForm)
      return
    }
    let newSubsidy = {
      name: this.addSubsidyForm.value.name,
      producttypeid: this.addSubsidyForm.value.producttypeid,
      rate: this.addSubsidyForm.value.rate,
      farmercategoryid: this.addSubsidyForm.value.farmercategoryid,
    };
    this.sb.addSubsidy(newSubsidy).subscribe((data) =>{
      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getSubsidy();
    this.addSubsidyForm.reset();
    // @ts-ignore
    $("#add_subsidy").modal("hide");
    this.toastr.success("New Subsisy added sucessfully...!", "Success");
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
  getFarmerCategory(id) {
    let typeArray=[];
    let index;
    
    typeArray = this.farmercategory?.map((type, itemIndex) => {
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
