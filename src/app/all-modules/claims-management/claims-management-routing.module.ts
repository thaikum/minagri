import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClaimsManagementComponent} from "./claims-management.component";
import {ManageClaimComponent} from "./manage-claim/manage-claim.component";

const routes: Routes = [
  {
    path: '',
    component: ClaimsManagementComponent,
    children: [
      {
        path: 'manage-claim',
        component: ManageClaimComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsManagementRoutingModule { }
