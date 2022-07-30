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
import {OrganizationType} from "../../../interface/UsetType";

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
  public allUserTypes: OrganizationType[];
  public addUserType: FormGroup;
  public editType: FormGroup;
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
        // .parents('.form-focus')
        // .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');

    this.getTypes();

    // Add Provident Form Validation And Getting Values

    this.addUserType = this.formBuilder.group({
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
    this.allUserTypes = [];
    this.getTypes();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getTypes() {
    this._orgService.getAllOrganizationTypes().subscribe(data => {
      this.allUserTypes = data.body;
      console.log(this.allUserTypes);
      this.rows = this.allUserTypes;
      this.srch = [...this.rows];
    })
  }

  getUser(id): User{
    return this.allUsers.filter((user)=>user.userid = id)[0];
  }


  // Add Provident Modal Api Call

  addUsersSubmit() {
    if (this.addUserType.valid) {
      const obj = {
        name: this.addUserType.value.name,
        description: this.addUserType.value.description,
      };
      this._orgService.createOrgType(obj).subscribe((data) => {
        $('#datatable').DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
        this.getTypes();
        $('#add_user').hide()
        this.addUserType.reset();
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
    const index = this.allUserTypes.findIndex((item) => {
      return item.id === value;
    });
    const toSetValues = this.allUserTypes[index];
    console.log(toSetValues.name)
    this.editType.setValue({
      id : value,
      name: toSetValues.name,
      description: toSetValues.description,
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
