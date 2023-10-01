import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdvertComponent } from './add-advert.component';

const routes: Routes = [
  {
    path: "",
    component: AddAdvertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAdvertRoutingModule { }
