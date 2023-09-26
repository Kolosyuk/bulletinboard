import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Главная страница',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)  
  },
  {
    path: 'personal',
    title: 'Личный кабинет',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/lk/lk.module').then(m => m.LkModule) 
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/lk/settings/settings.module').then(m => m.SettingsModule) 
      },
    ] 
  },
  {
    path: `login`,
    title: 'Вход',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)  
  },
  {
    path: `registration`,
    title: 'Регистрация',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule)  
  },
  {
    path: `:id`,
    title: 'Card',
    loadChildren: () => import('./pages/advirtisment/advirtisment-routing.module').then(m => m.AdvirtismentRoutingModule)  
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
