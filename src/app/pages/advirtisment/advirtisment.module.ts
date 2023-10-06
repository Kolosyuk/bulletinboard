import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvirtismentRoutingModule } from './advirtisment-routing.module';
import { AdvirtismentComponent } from './advirtisment.component';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    AdvirtismentComponent
  ],
  imports: [
    CommonModule,
    AdvirtismentRoutingModule,
    GalleriaModule,
    ButtonModule,
    DialogModule,
    DividerModule
  ],
})
export class AdvirtismentModule {}
