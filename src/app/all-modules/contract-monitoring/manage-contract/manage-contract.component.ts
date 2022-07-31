import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import {ContractService} from "../contract.service";
import {Contract} from "../interface/contract";

declare const $: any;
@Component({
  selector: 'app-manage-contract',
  templateUrl: './manage-contract.component.html',
  styleUrls: ['./manage-contract.component.css']
})
export class ManageContractComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public Contract: Contract[] = [];
  public addContractForm: FormGroup;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  constructor(public cs: ContractService,private formBuilder: FormBuilder,private toastr: ToastrService,) { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('[data-bs-toggle="tooltip"]').tooltip();
    });
    this.getContracts();

    // Add Contract Review Form Validation
    this.addContractForm = this.formBuilder.group({
      productName: ["", [Validators.required]],
      contractName: ["", [Validators.required]],
      subsidyRate: ["", [Validators.required]],
      farmerCategory: ["", [Validators.required]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
      contractFile: ["",[Validators.required]]
    });
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
    this.Contract = [];
    this.getContracts();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //Get All Contracts
  public getContracts() {
    this.cs.getAllContracts().subscribe((data) =>{
      this.Contract = data;
      this.rows = this.Contract;
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


  //Create New Contract Review
  public addContract() {
    if(this.addContractForm.invalid){
      this.markFormGroupTouched(this.addContractForm)
      return
    }
    let StartDate = this.pipe.transform(
      this.addContractForm.value.contractStartDate,
      "dd-MM-yyyy"
    );
    let EndDate = this.pipe.transform(
      this.addContractForm.value.contractEndDate,
      "dd-MM-yyyy"
    );
    let newContract = {
      productName: this.addContractForm.value.productName,
      contractName: this.addContractForm.value.contractName,
      subsidyRate: this.addContractForm.value.subsidyRate,
      farmerCategory: this.addContractForm.value.farmerCategory,
      endDate: EndDate,
      startDate: StartDate,
    };
    this.cs.addContract(newContract).subscribe((data) =>{
      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getContracts();
    this.addContractForm.reset();
    $("#add_contract").modal("hide");
    this.toastr.success("Contract Review added sucessfully...!", "Success");
  }

  // search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.productName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
