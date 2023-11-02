import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertRoutingModule } from './advert-routing.module';
import { AdvertComponent } from './advert.component';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    AdvertComponent
  ],
  imports: [
    CommonModule,
    AdvertRoutingModule,
    GalleriaModule,
    ButtonModule,
    DialogModule,
    DividerModule,
    SkeletonModule
  ],
})
export class AdvertModule {}
