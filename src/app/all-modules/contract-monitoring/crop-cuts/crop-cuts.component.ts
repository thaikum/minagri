import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import {ContractService} from "../contract.service";

declare const $: any;
@Component({
  selector: 'app-crop-cuts',
  templateUrl: './crop-cuts.component.html',
  styleUrls: ['./crop-cuts.component.css']
})
export class CropCutsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public cropcuts = [];
  public addCropcutsForm: FormGroup;

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
    // this.getCropcuts();

    // Add Contract Review Form Validation
    this.addCropcutsForm = this.formBuilder.group({
      partnerOrg: ["", [Validators.required]],
      projectName: ["", [Validators.required]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
      cropName: ["", [Validators.required]],
      ccSize: ["", [Validators.required]],
      provinceName: ["", [Validators.required]],
      districtName: ["", [Validators.required]],
    });
  }

  //Get All Cropcuts
  public getCropcuts(): void {
    this.cs.getCropcuts('').subscribe((data) => {
      // @ts-ignore
      this.cropcuts = data;
      this.dtTrigger.next();
      this.rows = this.cropcuts;
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

  //Create New Cropcut
  public addCropcuts() {
    if(this.addCropcutsForm.invalid){
      this.markFormGroupTouched(this.addCropcutsForm)
      return
    }
    let StartDate = this.pipe.transform(
      this.addCropcutsForm.value.StartDate,
      "dd-MM-yyyy"
    );
    let EndDate = this.pipe.transform(
      this.addCropcutsForm.value.EndDate,
      "dd-MM-yyyy"
    );
    let newCropcut = {
      partnerOrg: this.addCropcutsForm.value.partnerOrg,
      projectName: this.addCropcutsForm.value.projectName,
      endDate: EndDate,
      startDate: StartDate,
      cropName: this.addCropcutsForm.value.cropName,
      ccSize: this.addCropcutsForm.value.ccSize,
      provinceName: this.addCropcutsForm.value.provinceName,
      districtName: this.addCropcutsForm.value.districtName,
    };
    this.cs.addCropcut('', newCropcut).subscribe();
    this.getCropcuts();
    this.addCropcutsForm.reset();
    $("#add_contract").modal("hide");
    this.toastr.success("Contract Review added sucessfully...!", "Success");
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
