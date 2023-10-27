import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    title: 'Главная страница',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)  
  },
  {
    path: 'personal',
    canActivate: [ authGuard ],
    children: [
      {
        path: '',
        title: 'Мои объявления',
        loadChildren: () => import('./pages/lk/lk.module').then(m => m.LkModule) 
      },
      {
        path: 'settings',
        title: 'Настройки',
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
    path: `not-found`,
    title: 'Страница не найдена',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: `error-page`,
    title: 'Ошибка',
    loadChildren: () => import('./pages/error-page/error-page.module').then(m => m.ErrorPageModule)
  },   
  {
    path: 'advert',
    children: [
      {
        path: `add`,
        canActivate: [ authGuard ],
        title: 'Добавить объявление',
        loadChildren: () => import('./pages/add-advert/add-advert.module').then(m => m.AddAdvertModule)  
      },
      {
        path: `:id`,
        title: 'Объявление',
        children: [
          {
            path: '',
            data: { id : `:id`},
            loadChildren: () => import('./pages/advert/advert.module').then(m => m.AdvertModule)
          },
          {
            path: 'map',
            title: 'Карта',
            loadChildren: () => import('./pages/advert/map/map.module').then(m => m.MapModule)
          }
        ]
          
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
