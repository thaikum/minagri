import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import {CommissionService} from "../commission.service";
import { Commission } from '../interface/commission';

declare const $: any;
@Component({
  selector: 'app-create-commission',
  templateUrl: './create-commission.component.html',
  styleUrls: ['./create-commission.component.css']
})
export class CreateCommissionComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public commissions: Commission[];
  public createCommisssiomForm: FormGroup;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  constructor(public cs: CommissionService,private formBuilder: FormBuilder,private toastr: ToastrService,) { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('[data-bs-toggle="tooltip"]').tooltip();
    });

    // Add Commission Form Validation
    this.createCommisssiomForm = this.formBuilder.group({
      itemName: ["", [Validators.required]],
      description: ["", [Validators.required]],
      unitCost: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      discount: ["", [Validators.required]],
      otherInformation: ["", [Validators.required]],
    });
  }


  //  1. get all Sales Commissions
  public getCommissions() {
    this.cs.getAllCommissions().subscribe(data => {
      this.commissions = data.body;
      console.log(this.commissions)
      this.rows = this.commissions;
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

  //Create Commssion
  public saveCommission() {
    if(this.createCommisssiomForm.invalid){
      this.markFormGroupTouched(this.createCommisssiomForm)
      return
    }
    let newCommission = {
      itemName: this.createCommisssiomForm.value.itemName,
      description: this.createCommisssiomForm.value.description,
      unitCost: this.createCommisssiomForm.value.unitCost,
      quantity: this.createCommisssiomForm.value.quantity,
      discount: this.createCommisssiomForm.value.discount,
      otherInformation: this.createCommisssiomForm.value.otherInformation,
    };
    // @ts-ignore
    this.cs.createCommission(newCommission).subscribe((data) => {
      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    // this.getCommissions();
    this.createCommisssiomForm.reset();
    this.toastr.success("Commission created sucessfully...!", "Success");
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
