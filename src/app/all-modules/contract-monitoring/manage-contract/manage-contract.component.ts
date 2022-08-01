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
  public contract: Contract[] = [];
  public addContractForm: FormGroup;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  constructor(public cs: ContractService,private formBuilder: FormBuilder,private toastr: ToastrService,) { }

  ngOnInit(): void {
    $('.floating')
      .on('focus blur', function (e) {
        $(this)
          .parents('.form-focus')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');
    this.getContracts();

    // Add Contract Review Form Validation
    this.addContractForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      contracttype: ["", [Validators.required]],
      productid: ["", [Validators.required]],
      startdate: ["", [Validators.required]],
      enddate: ["", [Validators.required]],
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
    this.contract = [];
    this.getContracts();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //Get All Contracts
  public getContracts() {
    this.cs.getAllContracts().subscribe(data =>{
      this.contract = data.body;
      console.log(this.contract)
      this.rows = this.contract;
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
    // let startdate = this.pipe.transform(
    //   this.addContractForm.value.startdate,
    //   "dd-MM-yyyy"
    // );
    // let enddate = this.pipe.transform(
    //   this.addContractForm.value.enddate,
    //   "dd-MM-yyyy"
    // );
    let newContract = {
      name: this.addContractForm.value.name,
      contracttype: this.addContractForm.value.contracttype,
      productid: this.addContractForm.value.productid,
      startdate: this.addContractForm.value.startdate,
      enddate: this.addContractForm.value.enddate,
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
