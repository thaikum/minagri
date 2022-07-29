import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { SubsidyRoutingModule } from './subsidy-routing.module';
import { ManageSubsidyComponent } from './manage-subsidy/manage-subsidy.component';
import {SubsidyComponent} from "./subsidy.component";
import {HeaderComponent} from "../../header/header.component";
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SubsidyComponent,
    ManageSubsidyComponent,
    HeaderComponent,
    SidebarComponent,

  ],
  imports: [
    CommonModule,
    SubsidyRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [ManageSubsidyComponent, SubsidyComponent]
})
export class SubsidyModule { }
