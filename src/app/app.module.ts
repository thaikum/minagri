import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Bootstrap DataTable
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserModalComponent } from './modals/user-modal/user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UserModalComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataTablesModule,
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
