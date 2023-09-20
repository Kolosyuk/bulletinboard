import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvirtismentRoutingModule } from './advirtisment-routing.module';
import { AdvirtismentComponent } from './advirtisment.component';


@NgModule({
  declarations: [
    AdvirtismentComponent
  ],
  imports: [
    CommonModule,
    AdvirtismentRoutingModule
  ]
})
export class AdvirtismentModule { }
