import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LkComponent } from './lk.component';

const routes: Routes = [
  {
    path: '',
    component: LkComponent
  },
  {
    path: 'settings',
    title: 'Настройки',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LkRoutingModule { }
