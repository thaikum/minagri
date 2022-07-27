import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommissionComponent} from "./commission.component";
import {ManageCommissionComponent} from "./manage-commission/manage-commission.component";

const routes: Routes = [
  {
    path: '',
    component: CommissionComponent,
    children: [
      {
        path: 'manage-commission',
        component: ManageCommissionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionRoutingModule { }
