import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageSubsidyComponent} from "./manage-subsidy/manage-subsidy.component";

const routes: Routes = [

  {
    path: 'subsidy',
    component: ManageSubsidyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubsidyRoutingModule { }
