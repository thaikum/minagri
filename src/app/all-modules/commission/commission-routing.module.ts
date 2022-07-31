import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommissionComponent} from "./commission.component";
import {ManageCommissionComponent} from "./manage-commission/manage-commission.component";
import {CreateCommissionComponent} from "./create-commission/create-commission.component";

const routes: Routes = [
  {
    path: '',
    component: CommissionComponent,
    children: [
      {
        path: 'manage-commission',
        component: ManageCommissionComponent
      },
      {
        path: 'create-commission',
        component: CreateCommissionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionRoutingModule { }
