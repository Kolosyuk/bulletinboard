import { NgModule } from '@angular/core';
import { MenuItemViewPipe } from './menu-item-view.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [
    MenuItemViewPipe,
    OrderByPipe
  ],
  exports: [
    MenuItemViewPipe,
    OrderByPipe
  ]
})
export class CustomPipesModule { }
