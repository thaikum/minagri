import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserMainComponent } from './user-main/user-main.component';
import {UserTypeComponent} from "../assets/user-type/user-type.component";

const routes: Routes = [
  {
    path:"",
    component:UsersComponent,
    children:[
      {
        path:"user-main",
        component:UserMainComponent
      },
      {
        path:"user-type",
        component: UserTypeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
