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
import { InnerTabCellComponent } from './components/search-navigation/inner-tab-cell/inner-tab-cell.component';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SearchNavigationComponent,
    InnerTabComponent,
    InnerTabCellComponent,
    OrderByPipe
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
    TabViewModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    httpInterceptorProviders,
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
