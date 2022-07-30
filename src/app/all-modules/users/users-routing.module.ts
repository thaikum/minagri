import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserMainComponent } from './user-main/user-main.component';
import {UserTypeComponent} from "../organization/user-type/user-type.component";
import {UserGroupComponent} from "./user-group/user-group.component";
import {RolesComponent} from "./roles/roles.component";

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
      },
      {
        path:"user-group",
        component: UserGroupComponent
      },
      {
        path:"user-roles",
        component: RolesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
