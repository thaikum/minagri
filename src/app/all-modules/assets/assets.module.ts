import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { AssetsMainComponent } from './assets-main/assets-main.component';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { OrganizationTypeComponent } from './organization-type/organization-type.component';

@NgModule({
  declarations: [AssetsComponent, AssetsMainComponent, OrganizationTypeComponent],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    SharingModule
  ], 
})
export class AssetsModule { }
