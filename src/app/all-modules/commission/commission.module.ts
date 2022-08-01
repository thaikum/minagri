import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionRoutingModule } from './commission-routing.module';
import { CommissionComponent } from './commission.component';
import { ManageCommissionComponent } from './manage-commission/manage-commission.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CreateCommissionComponent } from './create-commission/create-commission.component';


@NgModule({
  declarations: [
    CommissionComponent,
    ManageCommissionComponent,
    CreateCommissionComponent
  ],
  imports: [
    CommonModule,
    CommissionRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class CommissionModule { }
