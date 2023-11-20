import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from './layout/header/header.component';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { SearchNavigationComponent } from './components/search-navigation/search-navigation.component';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(() => {
    //нужно править спуСервис, что бы возвращал обсервейбл
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      BreadcrumbsComponent,
      SearchNavigationComponent,
      ToastComponentStub
    ],
    imports: [
      RouterTestingModule,
      DividerModule,
      BreadcrumbModule
    ],
    providers: [
      provideHttpClient(),
      {provide: MessageService, useValue: messageServiceSpy}
    ]
  })
});

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

@Component({selector: 'p-toast', template: ''})
    class ToastComponentStub {
}
