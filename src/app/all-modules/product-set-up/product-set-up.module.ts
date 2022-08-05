import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSetUpRoutingModule } from './product-set-up-routing.module';
import { ManageProductCategoriesComponent } from './manage-product-categories/manage-product-categories.component';
import { ManageProductTypeComponent } from './manage-product-type/manage-product-type.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ProductSetUpComponent } from './product-set-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ManageProductCategoriesComponent,
    ManageProductTypeComponent,
    ManageProductsComponent,
    ProductSetUpComponent
  ],
  imports: [
    CommonModule,
    ProductSetUpRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ProductSetUpModule { }
