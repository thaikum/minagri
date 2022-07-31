import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import {SubsidyService} from "../subsidy.service";
import { Subsidy } from '../interface/subsidy';


@HostListener('window: resize', ['$event'])
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
  public Subsidy: Subsidy[] = [];
  public addSubsidyForm: FormGroup;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  public innerHeight: any;

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }


  constructor(private http: HttpClient, public sb: SubsidyService,private formBuilder: FormBuilder,private toastr: ToastrService,) {}

  ngOnInit() {
    $(document).ready(function () {
      // @ts-ignore
      $('[data-bs-toggle="tooltip"]').tooltip();
    });

    // Add SubsidyForm Validation
    this.addSubsidyForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      productType: ["", [Validators.required]],
      subsidyRate: ["", [Validators.required]],
      farmerCategory: ["", [Validators.required]],
    });
    //subsidies
    this.getSubsidy();

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
    this.Subsidy = [];
    this.getSubsidy();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
//  Endpoints
//  1. get all Subsidies

  public getSubsidy() {
    this.sb.getAllSubsidies().subscribe((data) =>{
      this.Subsidy = data;
      this.rows = this.Subsidy;
      this.srch = [...this.rows];
    })
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
      productType: this.addSubsidyForm.value.productType,
      subsidyRate: this.addSubsidyForm.value.subsidyRate,
      farmerCategory: this.addSubsidyForm.value.farmerCategory,
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
      return d.subsidyName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
