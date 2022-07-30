import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserMainComponent } from './user-main/user-main.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTypeComponent } from '../organization/user-type/user-type.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  declarations: [UsersComponent, UserMainComponent, UserTypeComponent, UserGroupComponent, RolesComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
