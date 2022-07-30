import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AllModulesService} from '../../all-modules.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {DatePipe} from '@angular/common';
import {DataTableDirective} from 'angular-datatables';
import {FarmerService} from '../../../services/farmer.service';
import {Farmer} from '../../../interface/Farmer';
import {UsersService} from "../../../services/users.service";
import {User} from "../../../interface/User";

declare const $: any;

@Component({
  selector: 'app-farmers-content',
  templateUrl: './tickets-content.component.html',
  styleUrls: ['./tickets-content.component.css'],
})
export class TicketsContentComponent implements OnInit, OnDestroy, AfterViewInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective;
  public url: any = 'tickets';
  public allTickets: Farmer[] = [];
  public addFarmerForm: FormGroup;
  public editTicketForm: FormGroup;
  public editId: any;
  public tempId: any;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe('en-US');

  public users: User[] = [];

  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _farmerService: FarmerService,
    private _userService: UsersService
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

    this.getFarmers();
    // Add Ticket Form Validation And Getting Values
    this.addFarmerForm = this.formBuilder.group({
      accountname: ['', [Validators.required]],
      accountnumber: ['', [Validators.required]],
      bankname: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      fieldagentid: [''[Validators.length]],
      locationid: [''],
      maritalstatus: [''],
      nidaverification: ['N'],
      photo: [''],
      rlmaverification: ['N'],
      userid: ['N']
    });

    // Edit Ticket Form Validation And Getting Values

    this.editTicketForm = this.formBuilder.group({
      accountname: ['', [Validators.required]],
      accountnumber: ['', [Validators.required]],
      bankname: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      fieldagentid: [''[Validators.length]],
      locationid: [''],
      maritalstatus: [''],
      nidaverification: ['N'],
      photo: [''],
      rlmaverification: ['N'],
      userid: ['']
    });

    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };

    this._userService.getAllUsers().subscribe((resp) => {
      console.log(resp.body)
      this.users = resp.body;
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
    this.allTickets = [];
    this.getFarmers();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getFarmers() {
    this._farmerService.getAllFarmers().subscribe((data) => {
      console.log(data.body)
      this.allTickets = data.body;
      this.rows = this.allTickets;
      this.srch = [...this.rows];
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Add Ticket Modal Api Call

  addTickets() {
    if (this.addFarmerForm.invalid) {
      this.markFormGroupTouched(this.addFarmerForm)
      return
    }
    if (this.addFarmerForm.valid) {
      const obj = {
        accountname: this.addFarmerForm.value.accountname,
        accountnumber: this.addFarmerForm.value.accountnumber,
        bankname: this.addFarmerForm.value.bankname,
        branch: this.addFarmerForm.value.branch,
        fieldagentid: this.addFarmerForm.value.fieldagentid,
        locationid: this.addFarmerForm.value.locationid,
        maritalstatus: this.addFarmerForm.value.maritalstatus,
        nidaverification: this.addFarmerForm.value.nidaverification,
        photo: '',
        rlmaverification: this.addFarmerForm.value.rlmaverification,
        userid: this.addFarmerForm.value.userid
      };
      this._farmerService.createFarmer(obj).subscribe((data) => {
        $('#datatable').DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getFarmers();
      $('#add_ticket').modal('hide');
      this.addFarmerForm.reset();
      this.toastr.success('Tickets added', 'Success');
    } else {
      this.toastr.warning('Mandatory fields required', '');
    }
  }

  // Edit Ticket Modal Api Call

  editTicket() {
    const obj = {
      ticketSubject: this.editTicketForm.value.editTicketSubject,
      ticketId: this.editTicketForm.value.editTicketId,
      assignedStaff: this.editTicketForm.value.editAssignStaff,
      client: this.editTicketForm.value.editClientName,
      cc: this.editTicketForm.value.editccName,
      priority: this.editTicketForm.value.editPriorityName,
      assigne: this.editTicketForm.value.editAssignName,
      addfollow: this.editTicketForm.value.editaddFlowers,
      createdDate: '05-09-2020',
      lastReply: '06-09-2020',
      status: 'Approved',
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {
      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getFarmers();
    $('#edit_ticket').modal('hide');
    this.editTicketForm.reset();
    this.toastr.success('Tickets updated', 'Success');
  }

  edit(value) {
    this.editId = value;
    const index = this.allTickets.findIndex((item) => {
      return item.userid === value;
    });
    const toSetValues = this.allTickets[index];
    this.editTicketForm.setValue({
      accountname: toSetValues.accountname,
      accountnumber: toSetValues.accountnumber,
      bankname: toSetValues.bankname,
      branch: toSetValues.branch,
      fieldagentid: toSetValues.fieldagentid,
      locationid: toSetValues.locationid,
      maritalstatus: toSetValues.maritalstatus,
      nidaverification: toSetValues.nidaverification,
      photo: '',
      rlmaverification: toSetValues.nidaverification,
      userid: toSetValues.userid
    });
  }

  // Delete Ticket Modal Api Call
  deleteTicket() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getFarmers();
    $('#delete_ticket').modal('hide');
    this.toastr.success('Tickets deleted', 'Success');
  }

  // search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter((d) => {
      val = val.toLowerCase();
      return d.assignedStaff.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // search by status
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter((d) => {
      val = val.toLowerCase();
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  searchPriority(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter((d) => {
      val = val.toLowerCase();
      return d.priority.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // search by purchase
  searchFrom(val) {
    const mySimpleFormat = this.pipe.transform(val, 'dd-MM-yyyy');
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter((d) => {
      return d.createdDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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
  searchTo(val) {
    const mySimpleFormat = this.pipe.transform(val, 'dd-MM-yyyy');
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter((d) => {
      return d.lastReply.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
