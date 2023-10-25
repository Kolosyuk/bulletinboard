import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertComponent } from './advert.component';

const routes: Routes = [
  {
    path: '',
    component: AdvertComponent
  },
  {
    path: 'map',
    title: 'Карта',
    loadChildren: () => import('./map/map.module').then(m => m.MapModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertRoutingModule { }
