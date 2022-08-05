import { DatePipe } from '@angular/common';
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
import {Sale} from '../../../interface/Sale';
import {SalesService} from '../../../services/sales.service';
import {FarmerService} from "../../../services/farmer.service";
import {Farmer} from "../../../interface/Farmer";
import {Router} from "@angular/router";

declare const $: any;
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit, OnDestroy , AfterViewInit{
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public sales: Sale[] = [];
  public addSalesForm: FormGroup;
  public editProjectForm: FormGroup;
  public tempId: any;
  public farmers: Farmer[];

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe('en-US');
  public products: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _salesService: SalesService,
    private _farmerService: FarmerService,
    private _router:Router
  ) {}

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };
    this.getSales();

    this._farmerService.getAllFarmers().subscribe(data=>{
      this.farmers = data.body;
    });

    // Add Projects form
    this.addSalesForm = this.formBuilder.group({
      actualpay: ['', Validators.required],
      covervalue: ['', Validators.required],
      farmeruserid: ['', Validators.required],
      farmid: ['', Validators.required],
      productid: ['', Validators.required],
      subsidyvalue: ['', Validators.required]
    });

    // Edit Projects Form
    this.editProjectForm = this.formBuilder.group({
      actualpay: ['', Validators.required],
      covervalue: ['', Validators.required],
      farmeruserid: ['', Validators.required],
      farmid: ['', Validators.required],
      productid: ['', Validators.required],
      subsidyvalue: ['', Validators.required]
    });

    this._salesService.getAllProducts().subscribe((resp)=>{
      this.products = resp.body;
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
    this.sales = [];
    this.getSales();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getSales() {
    this._salesService.getAllSales().subscribe((data) => {
      // @ts-ignore
      this.sales = data.body;
      this.rows = this.sales;
      this.srch = [...this.rows];
    });
  }

  // Edit project
  public editProject(id: any) {
    return;
    // this.tempId = id;
    // const index = this.Sales.findIndex((item) => {
    //   return item.id === id;
    // });
    // const toSetValues = this.Sales[index];
    // this.editProjectForm.setValue({
    //   editProjectName: toSetValues.name,
    //   editProjectDescription: toSetValues.description,
    //   editProjectEndDate: toSetValues.endDate,
    //   editProjectStartDate: toSetValues.startDate,
    //   editProjectPriority: toSetValues.priority,
    //   editaddTeamMembers: toSetValues.teamMember,
    //   editProjectId: toSetValues.projectId,
    //   editId: toSetValues.id,
    // });
  }

  // Create New Project
  public addSale() {
    console.log(this.addSalesForm.value);
    const newProject = {
      ...this.addSalesForm.value
    };
    this._salesService.makeSale(newProject).subscribe((data) => {

      this._router.navigate(['/layout/success'],{state: {
          message: "Sale has been made"
        }});

      $('#datatable').DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getSales();
    this.addSalesForm.reset();
    $('#create_project').modal('hide');
  }

  // Save Project
  public saveProject() {
    const StartDate = this.pipe.transform(
      this.editProjectForm.value.editProjectStartDate,
      'dd-MM-yyyy'
    );
    const EndDate = this.pipe.transform(
      this.editProjectForm.value.editProjectEndDate,
      'dd-MM-yyyy'
    );
    const editedProject = {
      name: this.editProjectForm.value.editProjectName,
      description: this.editProjectForm.value.editProjectDescription,
      endDate: EndDate,
      startDate: StartDate,
      priority: this.editProjectForm.value.editProjectPriority,
      teamMember: this.editProjectForm.value.editaddTeamMembers,
      projectId: this.editProjectForm.value.editProjectPriority,
      id: this.tempId,
    };
    // this.allModulesService
    //
    //   .update(editedProject, 'Sales')
    //   .subscribe((data) => {
    //     $('#datatable').DataTable().clear();
    //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //       dtInstance.destroy();
    //     });
    //     this.dtTrigger.next();
    //   });
    // this.getProjects();
    // this.editProjectForm.reset();
    // $('#edit_project').modal('hide');
    // this.toastr.success('Project updated sucessfully...!', 'Success');
  }

  // Delete project
  public deleteProject() {
    // this.allModulesService.delete(this.tempId, 'Sales').subscribe((data) => {
    //   $('#datatable').DataTable().clear();
    //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //     dtInstance.destroy();
    //   });
    //   this.dtTrigger.next();
    // });
    // this.getProjects();
    // $('#delete_project').modal('hide');
    // this.toastr.success('Project deleted sucessfully...!', 'Success');
  }

  // search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
