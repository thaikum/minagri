import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsManagementRoutingModule } from './claims-management-routing.module';
import { ClaimsManagementComponent } from './claims-management.component';
import { ManageClaimComponent } from './manage-claim/manage-claim.component';


@NgModule({
  declarations: [
    ClaimsManagementComponent,
    ManageClaimComponent
  ],
  imports: [
    CommonModule,
    ClaimsManagementRoutingModule
  ]
})
export class ClaimsManagementModule { }
