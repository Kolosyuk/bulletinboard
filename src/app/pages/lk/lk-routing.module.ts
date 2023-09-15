import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LkComponent } from './lk.component';

const routes: Routes = [
  {
    path: '',
    component: LkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LkRoutingModule { }
