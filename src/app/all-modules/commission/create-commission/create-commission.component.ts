import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import {CommissionService} from "../commission.service";

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
  public commission = [];
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
    this.cs.createCommission('', newCommission).subscribe();
    this.createCommisssiomForm.reset();
    this.toastr.success("Commission created sucessfully...!", "Success");
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
