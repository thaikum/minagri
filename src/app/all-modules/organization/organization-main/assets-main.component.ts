import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {AllModulesService} from '../../all-modules.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {DatePipe} from '@angular/common';
import {Organization} from '../../../interface/Organization';
import {OrganizationService} from '../../../services/organization.service';
import {User} from '../../../interface/User';
import {UsersService} from '../../../services/users.service';
import {MatDialog} from '@angular/material/dialog';
import {UserModalComponent} from '../../../modals/user-modal/user-modal.component';
import {OrganizationType} from "../../../interface/UsetType";
import {Router} from "@angular/router";

declare const $: any;

@Component({
  selector: 'app-organization-main',
  templateUrl: './assets-main.component.html',
  styleUrls: ['./assets-main.component.css'],
})
export class AssetsMainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = 'assets';
  public allAssets: Organization[] = [];
  public addOrganization: FormGroup;
  public editOrganization: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe('en-US');
  public editPurchaseDateFormat;
  public editPurchaseToDateFormat;

  public userDtOptions: DataTables.Settings = {};
  public organizationType: OrganizationType[];

  userDtTrigger: Subject<any> = new Subject();

  users: User[] = [];


  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _organizationService: OrganizationService,
    private _userService: UsersService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
  }

  ngOnInit() {
    // for floating label

    $('.floating')
      .on('focus blur', function (e) {
        $(this)
          .parents('.form-focus')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');

    // get organization data from API

    this.getOrganizations();

    // Add Assets Form Validation And Getting Values

    this.addOrganization = this.formBuilder.group({
      contactuserid: [0],
      email: [''],
      licensenumber: [''],
      locationid: [0],
      name: [''],
      orgtype: [0],
      phonenumber: [''],
      registrationnumber: [''],
      website: [''],
    });

    // Edit Assets Form Validation And Getting Values

    this.editOrganization = this.formBuilder.group({
      contactuserid: [0],
      email: [''],
      licensenumber: [''],
      locationid: [0],
      name: [''],
      orgtype: [0],
      phonenumber: [''],
      registrationnumber: [''],
      website: [''],
      id: [''],
      createdby: [''],
      createdon: ['']
    });

    this.getUsers();

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };

    this._organizationService.getAllOrganizationTypes().subscribe(resp => {
      this.organizationType = resp.body;
    })

  }

  setUser(user: User): void {
    this.addOrganization.controls.contactuserid.setValue(user.userid);
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

    this.allAssets = [];
    this.getOrganizations();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // get data for data table
  getOrganizations() {
    this._organizationService.getAll().subscribe((data) => {
      console.log(data.body)
      this.allAssets = data.body;
      this.rows = this.allAssets;
      this.srch = [...this.rows];
    });
  }

  getUsers(): void {
    this._userService.getAllUsers().subscribe(data => {
      this.users = data.body;
      this.userDtTrigger.next();
    })
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Add Assets Modal Api Call
  addAssetsSubmit() {
    if (this.addOrganization.invalid) {
      this.markFormGroupTouched(this.addOrganization)
      return
    }
    if (this.addOrganization.valid) {
      const purchaseDateFormat = this.pipe.transform(
        this.addOrganization.value.purchaseDate,
        'dd-MM-yyyy'
      );
      const purchaseToDateFormat = this.pipe.transform(
        this.addOrganization.value.purchaseTo,
        'dd-MM-yyyy'
      );
      const obj = {
        contactuserid: this.addOrganization.value.contactuserid,
        email: this.addOrganization.value.email,
        licensenumber: this.addOrganization.value.licensenumber,
        locationid: this.addOrganization.value.locationid,
        name: this.addOrganization.value.name,
        orgtype: this.addOrganization.value.orgtype,
        phonenumber: this.addOrganization.value.phonenumber,
        registrationnumber: this.addOrganization.value.registrationnumber,
        website: this.addOrganization.value.website,
      };

      this._organizationService.create(obj).subscribe((data) => {
        $('#datatable').DataTable().clear();
        this._router.navigate(['/layout/success'],{state: {
            message: "Organization created successfully"
          }})
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getOrganizations();
      $('#add_asset').modal('hide');
      this.addOrganization.reset();
      this.toastr.success('Assets is added', 'Success');
    } else {
      this.toastr.warning('Mandatory fields required', '');
    }
  }

  // to know the date picker changes

  from(data) {
    this.editPurchaseDateFormat = this.pipe.transform(data, 'dd-MM-yyyy');
  }

  to(data) {
    this.editPurchaseToDateFormat = this.pipe.transform(data, 'dd-MM-yyyy');
  }

  // Edit Assets Modal Api Call
  editAssetSubmit() {
    let loc = "";
    navigator.geolocation.getCurrentPosition((locat)=>{
      loc = locat.coords.latitude +','+locat.coords.longitude;
    })
    if (this.editOrganization.valid) {
      const obj: Organization = {
        contactuserid: this.editOrganization.value.contactuserid,
        email: this.editOrganization.value.email,
        licensenumber: this.editOrganization.value.licensenumber,
        locationid: 3,
        name: this.editOrganization.value.name,
        orgtype: this.editOrganization.value.orgtype,
        phonenumber: this.editOrganization.value.phonenumber,
        registrationnumber: this.editOrganization.value.registrationnumber,
        website: this.editOrganization.value.website,
        createdby: this.editOrganization.value.createdby,
        creationdate: this.editOrganization.value.createdon,
        id: this.editOrganization.value.id,
      };
      this._organizationService.edit(obj).subscribe((data1) => {
        $('#datatable').DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getOrganizations();
      $('#edit_asset').modal('hide');
      this.toastr.success('Assets is edited', 'Success');
    } else {
      this.toastr.warning('Mandatory fields required', '');
    }
  }

  // for set values to editassets form
  edit(value) {
    this.editId = value;
    const index = this.allAssets.findIndex((item) => {
      return item.registrationnumber === value;
    });
    const toSetValues = this.allAssets[index];
    this.editOrganization.setValue({
      contactuserid: toSetValues.contactuserid,
      email: toSetValues.email,
      licensenumber: toSetValues.licensenumber,
      locationid: toSetValues.locationid,
      name: toSetValues.name,
      orgtype: toSetValues.orgtype,
      phonenumber: toSetValues.phonenumber,
      registrationnumber: toSetValues.registrationnumber,
      website: toSetValues.website,
      id: toSetValues.id,
      createdby: toSetValues.createdby,
      createdon: toSetValues.creationdate
    });
  }

  // Delete Assets Modal Api Call
  deleteAssets() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getOrganizations();
    $('#delete_asset').modal('hide');
    this.toastr.success('Assets is deleted', 'Success');
  }

  // search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.assetUser.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // search by status
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.assetStatus.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // search by purchase

  searchByPurchase(val) {
    const mySimpleFormat = this.pipe.transform(val, 'dd-MM-yyyy');
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      return d.purchaseDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $('.floating')
      .on('focus blur', function (e) {
        $(this)
          .parents('.form-focus')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');
  }

  // search by warranty
  searchByWarranty(val) {
    const mySimpleFormat = this.pipe.transform(val, 'dd-MM-yyyy');
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      return d.warrentyEnd.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $('.floating')
      .on('focus blur', function (e) {
        $(this)
          .parents('.form-focus')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');
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
}
