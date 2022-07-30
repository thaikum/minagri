import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {UserGroup} from '../../../interface/UserGroup';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {User} from '../../../interface/User';
import {AllModulesService} from '../../all-modules.service';
import {ToastrService} from 'ngx-toastr';
import {UsersService} from '../../../services/users.service';
import {OrganizationService} from '../../../services/organization.service';
import {Role} from "../../../interface/Role";

declare const $: any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = 'users';
  public allRoles: Role[];
  public addRole: FormGroup;
  public editRoleForm: FormGroup;
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

    this.addRole = this.formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
    });

    // Edit Provident Form Validation And Getting Values

    this.editRoleForm = this.formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
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
    this.allRoles = [];
    this.getTypes();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getTypes() {
    this._orgService.getAllRoles().subscribe(data => {
      console.log(data.body);
      this.allRoles = data.body;
      console.log(this.allRoles);
      this.rows = this.allRoles;
      this.srch = [...this.rows];
    })
  }

  getUser(id): User{
    return this.allUsers.filter((user)=>user.userid = id)[0];
  }


  // Add Provident Modal Api Call

  addRolesSubmit() {
    if (this.addRole.valid) {
      const obj = {
        name: this.addRole.value.name,
        description: this.addRole.value.description
      };
      this._orgService.createRole(obj).subscribe((data) => {
        $('#datatable').DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
        this.getTypes();
        $('#add_user_group').hide()
        this.addRole.reset();
        this.toastr.success('Users is added', 'Success');
      }, error => {
        this.toastr.error(error.message, 'Error');
      });
    } else {
      this.toastr.warning('Mandatory fields required', '');
    }
  }

  // Edit Provident Modal Api Call

  editRole() {
    if (this.editRoleForm.valid) {
      const obj = {
        name: this.editRoleForm.value.name,
        description: this.editRoleForm.value.description,
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
    const index = this.allRoles.findIndex((item) => {
      return item.roleid === value;
    });
    const toSetValues = this.allRoles[index];
    console.log(toSetValues.name)
    this.editRoleForm.setValue({
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
