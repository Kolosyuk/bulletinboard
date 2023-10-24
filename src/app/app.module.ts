import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app.routing.module";
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { httpInterceptorProviders } from './http-interceptors';
import { DividerModule } from 'primeng/divider';
import { SearchNavigationComponent } from './components/search-navigation/search-navigation.component';
import { TabViewModule } from 'primeng/tabview';
import { InnerTabComponent } from './components/search-navigation/inner-tab/inner-tab.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SearchNavigationComponent,
    InnerTabComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    MenuModule,
    MessageModule,
    MessagesModule,
    RouterOutlet,
    ToastModule,
    BreadcrumbModule,
    DividerModule,
    TabViewModule
  ],
  providers: [
    httpInterceptorProviders,
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
