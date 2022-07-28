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
import {UsersService} from '../../../services/users.service';
import {User} from '../../../interface/User';
import {OrganizationService} from "../../../services/organization.service";

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = 'users';
  public allUsers: any;
  public addUsers: FormGroup;
  public editType: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public dtTrigger: Subject<any> = new Subject();

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
        // .parents('.form-focus')
        // .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');

    this.getTypes();

    // Add Provident Form Validation And Getting Values

    this.addUsers = this.formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
    });

    // Edit Provident Form Validation And Getting Values

    this.editType = this.formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
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
    this.allUsers = [];
    this.getTypes();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getTypes() {
    this._orgService.getUserTypes().subscribe(data => {
      this.allUsers = data.body;
      console.log(this.allUsers);
      this.rows = this.allUsers;
      this.srch = [...this.rows];
    })
  }

  // Add Provident Modal Api Call

  addUsersSubmit() {
    if (this.addUsers.valid) {
      const obj = {
        name: this.addUsers.value.name,
        description: this.addUsers.value.description,
      };
      this._userService.registerUser(obj).subscribe((data) => {
        $('#datatable').DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getTypes();
      $('#add_user').hide()
      this.addUsers.reset();
      this.toastr.success('Users is added', 'Success');
    } else {
      this.toastr.warning('Mandatory fields required', '');
    }
  }

  // Edit Provident Modal Api Call

  editUsersSubmit() {
    if (this.editType.valid) {
      const obj = {
        name: this.editType.value.name,
        description: this.editType.value.description,
      };
      this.allModuleService.update(obj, this.url).subscribe((data1) => {
        $('#datatable').DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getTypes();
      $('#edit_user').hide()
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
    this.editType.setValue({
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
    this.getTypes();
    $('#delete_user').hide()
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
