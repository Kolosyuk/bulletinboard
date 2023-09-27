import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app.routing.module";
import { RouterOutlet } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
