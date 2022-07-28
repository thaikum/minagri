import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsManagementRoutingModule } from './claims-management-routing.module';
import { ClaimsManagementComponent } from './claims-management.component';
import { ManageClaimComponent } from './manage-claim/manage-claim.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    ClaimsManagementComponent,
    ManageClaimComponent
  ],
  imports: [
    CommonModule,
    ClaimsManagementRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ClaimsManagementModule { }
