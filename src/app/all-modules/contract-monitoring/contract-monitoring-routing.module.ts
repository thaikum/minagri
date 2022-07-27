import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContractMonitoringComponent} from "./contract-monitoring.component";
import {CropCutsComponent} from "./crop-cuts/crop-cuts.component";
import {ManageContractComponent} from "./manage-contract/manage-contract.component";

const routes: Routes = [
  {
    path: '',
    component: ContractMonitoringComponent,
    children: [
      {
        path: 'crop-cuts',
        component: CropCutsComponent
      },
      {
        path: 'manage-contract',
        component: ManageContractComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractMonitoringRoutingModule { }
