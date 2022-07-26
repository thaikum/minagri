import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSetUpRoutingModule } from './product-set-up-routing.module';
import { ManageProductCategoriesComponent } from './manage-product-categories/manage-product-categories.component';
import { ManageProductTypeComponent } from './manage-product-type/manage-product-type.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';


@NgModule({
  declarations: [
    ManageProductCategoriesComponent,
    ManageProductTypeComponent,
    ManageProductsComponent
  ],
  imports: [
    CommonModule,
    ProductSetUpRoutingModule
  ]
})
export class ProductSetUpModule { }
