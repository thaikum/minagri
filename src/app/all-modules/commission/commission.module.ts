import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionRoutingModule } from './commission-routing.module';
import { CommissionComponent } from './commission.component';
import { ManageCommissionComponent } from './manage-commission/manage-commission.component';


@NgModule({
  declarations: [
    CommissionComponent,
    ManageCommissionComponent
  ],
  imports: [
    CommonModule,
    CommissionRoutingModule
  ]
})
export class CommissionModule { }
