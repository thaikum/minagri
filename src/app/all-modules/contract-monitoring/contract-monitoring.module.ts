import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractMonitoringRoutingModule } from './contract-monitoring-routing.module';
import { ManageContractComponent } from './manage-contract/manage-contract.component';
import { CropCutsComponent } from './crop-cuts/crop-cuts.component';
import { ContractMonitoringComponent } from './contract-monitoring.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    ManageContractComponent,
    CropCutsComponent,
    ContractMonitoringComponent
  ],
  imports: [
    CommonModule,
    ContractMonitoringRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ContractMonitoringModule { }
