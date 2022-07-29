import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageProductCategoriesComponent} from "./manage-product-categories/manage-product-categories.component";
import {ManageProductTypeComponent} from "./manage-product-type/manage-product-type.component";
import {ManageProductsComponent} from "./manage-products/manage-products.component";
import {ProductSetUpComponent} from "./product-set-up.component";

const routes: Routes = [
  {
    path: '',
    component: ProductSetUpComponent,
    children: [
      {
        path: 'product-categories',
        component: ManageProductCategoriesComponent
      },
      {
        path: 'product-type',
        component: ManageProductTypeComponent
      },
      {
        path: 'products',
        component: ManageProductsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSetUpRoutingModule { }
