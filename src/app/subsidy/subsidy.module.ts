import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubsidyRoutingModule } from './subsidy-routing.module';
import { ManageSubsidyComponent } from './manage-subsidy/manage-subsidy.component';
import {SubsidyComponent} from "./subsidy.component";
import {HeaderComponent} from "../header/header.component";
import {SidebarComponent} from "../sidebar/sidebar.component";


@NgModule({
  declarations: [
    SubsidyComponent,
    ManageSubsidyComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    SubsidyRoutingModule
  ]
})
export class SubsidyModule { }
