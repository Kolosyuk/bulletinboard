import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvirtismentComponent } from './advirtisment.component';

const routes: Routes = [
  {
    path: '',
    component: AdvirtismentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvirtismentRoutingModule { }
