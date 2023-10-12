import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LkRoutingModule } from './lk-routing.module';
import { LkComponent } from './lk.component';
import { CardListComponent } from 'src/app/components/card-list/card-list.component';


@NgModule({
  declarations: [
    LkComponent
  ],
  imports: [
    CommonModule,
    LkRoutingModule,
    CardListComponent
  ]
})
export class LkModule { }
