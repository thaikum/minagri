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
  Validators,
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../interface/User';
import {OrganizationType} from "../../../interface/UsetType";
import {OrganizationService} from "../../../services/organization.service";
import {UserGroup} from "../../../interface/UserGroup";

declare const $: any;

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css'],
})
export class UserMainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = 'users';
  public allUsers: User[];
  public addUsers: FormGroup;
  public editUsers: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public dtTrigger: Subject<any> = new Subject();
  public userGroups: UserGroup[] = [];

  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _userService: UsersService,
    private _orgService: OrganizationService
  ) {
  }

  ngOnInit() {
    $('.floating')
      .on('focus blur', function (e) {
        $(this)
          .parents('.form-focus')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');

    this.getUsers();

    // Add Provident Form Validation And Getting Values

    this.addUsers = this.formBuilder.group({
      firstName: ['', Validators.required],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      nationalid: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editUsers = this.formBuilder.group({
      firstName: [Validators.required],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      nationalid: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      userid: [''],
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };

    this._orgService.getAllUserGroups().subscribe(resp => {
      this.userGroups = resp.body;
    })
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
    this.allUsers = [];
    this.getUsers();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getUsers() {
    this._userService.getAllUsers().subscribe(data => {
      this.allUsers = data.body;
      console.log(this.allUsers);
      this.rows = this.allUsers;
      this.srch = [...this.rows];
    })
  }

  // Add Provident Modal Api Call

  addUsersSubmit() {
    if (this.addUsers.valid) {
      const obj: User = {
        name: this.addUsers.value.surname + ' ' + this.addUsers.value.firstName,
        email: this.addUsers.value.email,
        nationalid: this.addUsers.value.email,
        phonenumber: this.addUsers.value.phonenumber,
      };
      this._userService.registerUser(obj).subscribe((data) => {
        $('#datatable').DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getUsers();
      $('#add_user').modal('hide');
      this.addUsers.reset();
      this.toastr.success('Users is added', 'Success');
    } else {
      this.toastr.warning('Mandatory fields required', '');
    }
  }

  // Edit Provident Modal Api Call

  editUsersSubmit() {
    if (this.editUsers.valid) {
      const obj = {
        name: this.editUsers.value.surname + ' ' + this.editUsers.value.firstName,
        email: this.editUsers.value.email,
        nationalid: this.editUsers.value.email,
        phonenumber: this.editUsers.value.phonenumber,
        userId: this.editUsers.value.userId
      };
      this._userService.registerUser(obj).subscribe((data1) => {
        $('#datatable').DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getUsers();
      $('#edit_user').modal('hide');
      this.toastr.success('Users is edited', 'Success');
    } else {
      this.toastr.warning('Mandatory fields required', '');
    }
  }

  edit(value) {
    this.editId = value;
    const index = this.allUsers.findIndex((item) => {
      return item.userid === value;
    });
    const toSetValues = this.allUsers[index];
    console.log(toSetValues.name)
    this.editUsers.setValue({
      firstName: toSetValues.name?.trim().split(' ')[0] || '',
      surname: toSetValues.name?.trim().split(' ')[1] || '',
      email: toSetValues?.email,
      nationalid: toSetValues?.nationalid,
      phonenumber: toSetValues?.phonenumber,
      userid: toSetValues?.userid
    });
  }

  // Delete Provident Modal Api Call

  deleteUsers() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getUsers();
    $('#delete_user').modal('hide');
    this.toastr.success('Users is deleted', 'Success');
  }

  // search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter((d) => {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // search by name
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter((d) => {
      val = val.toLowerCase();
      return d.company.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // search by name
  searchRole(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter((d) => {
      val = val.toLowerCase();
      return d.role.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
