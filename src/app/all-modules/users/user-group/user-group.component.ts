import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {OrganizationType} from '../../../interface/UsetType';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {User} from '../../../interface/User';
import {AllModulesService} from '../../all-modules.service';
import {ToastrService} from 'ngx-toastr';
import {UsersService} from '../../../services/users.service';
import {OrganizationService} from '../../../services/organization.service';
import {UserGroup} from '../../../interface/UserGroup';

declare const $: any;

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = 'users';
  public allUserGroups: UserGroup[];
  public addUserGroup: FormGroup;
  public editUserGroup: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public dtTrigger: Subject<any> = new Subject();

  private allUsers: User[] = []

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
        .parents('.form-focus').toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');

    this.getTypes();

    // Add Provident Form Validation And Getting Values

    this.addUserGroup = this.formBuilder.group({
      name: new FormControl(''),
    });

    // Edit Provident Form Validation And Getting Values

    this.editUserGroup = this.formBuilder.group({
      name: new FormControl(''),
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };

    this._userService.getAllUsers().subscribe(users=>{
      this.allUsers = users.body;
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
    this.allUserGroups = [];
    this.getTypes();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getTypes() {
    this._orgService.getAllUserGroups().subscribe(data => {
      console.log(data.body);
      this.allUserGroups = data.body;
      console.log(this.allUserGroups);
      this.rows = this.allUserGroups;
      this.srch = [...this.rows];
    })
  }

  getUser(id): User{
    return this.allUsers.filter((user)=>user.userid = id)[0];
  }


  // Add Provident Modal Api Call

  addUsersSubmit() {
    if (this.addUserGroup.valid) {
      const obj = {
        name: this.addUserGroup.value.name,
      };
      this._orgService.createUserGroup(obj).subscribe((data) => {
        $('#datatable').DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
        this.getTypes();
        $('#add_user_group').hide()
        this.addUserGroup.reset();
        this.toastr.success('Users is added', 'Success');
      }, error => {
        this.toastr.error(error.message, 'Error');
      });
    } else {
      this.toastr.warning('Mandatory fields required', '');
    }
  }

  // Edit Provident Modal Api Call

  editUsersSubmit() {
    if (this.editUserGroup.valid) {
      const obj = {
        name: this.editUserGroup.value.name,
        description: this.editUserGroup.value.description,
      };
      this.allModuleService.update(obj, this.url).subscribe((data1) => {
        $('#datatable').DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getTypes();
      $('#edit_user_group').hide()
      this.toastr.success('Users is edited', 'Success');
    } else {
      this.toastr.warning('Mandatory fields required', '');
    }
  }

  edit(value) {
    this.editId = value;
    const index = this.allUserGroups.findIndex((item) => {
      return item.id === value;
    });
    const toSetValues = this.allUserGroups[index];
    console.log(toSetValues.name)
    this.editUserGroup.setValue({
      id : value,
      name: toSetValues.name,
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
