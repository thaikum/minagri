import { Component, OnInit } from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {User} from "../../interface/User";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();

  users: User[]

  constructor(private _userService: UsersService) {
    this._userService.getAllUsers().subscribe((users)=>{
      this.users = users.body;
    })
  }
  ngOnInit(): void {
  }

  getUsers(): void{
    this._userService.getAllUsers().subscribe((resp)=>{
      this.users = resp.body;
    })
  }

  rerender(): void {
    $('#datatable').DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.users = [];
    this.getUsers();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
}
