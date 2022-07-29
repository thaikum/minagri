import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { TicketsContentComponent } from './tickets-content/tickets-content.component';
import { DataTablesModule } from 'angular-datatables';
import { TicketsViewComponent } from './tickets-view/tickets-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharingModule } from 'src/app/sharing/sharing.module';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

@NgModule({
  declarations: [TicketsComponent, TicketsContentComponent, TicketsViewComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharingModule,
    DataTablesModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    SharingModule
  ]
})
export class TicketsModule { }
