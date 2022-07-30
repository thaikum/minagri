import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsComponent } from './assets.component';
import { AssetsMainComponent } from './organization-main/assets-main.component';
import {UserTypeComponent} from './user-type/user-type.component';

const routes: Routes = [
  {
    path:'',
    component:AssetsComponent,
    children:[
      {
        path:'organization-main',
        component:AssetsMainComponent
      },
      // {
      //   path:'organization-type',
      //   component: UserTypeComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
