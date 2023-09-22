import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvirtismentRoutingModule } from './advirtisment-routing.module';
import { AdvirtismentComponent } from './advirtisment.component';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    AdvirtismentComponent
  ],
  imports: [
    CommonModule,
    AdvirtismentRoutingModule,
    GalleriaModule
  ],
})
export class AdvirtismentModule {}
