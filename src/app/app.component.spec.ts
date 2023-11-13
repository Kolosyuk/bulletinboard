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

describe('AppComponent', () => {
  beforeEach(() => {
    //нужно править спуСервис, что бы возвращал обсервейбл
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      BreadcrumbsComponent,
      SearchNavigationComponent
    ],
    imports: [
      RouterTestingModule,
      ToastModule,
      DividerModule,
      BreadcrumbModule
    ],
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      {provide: MessageService, useValue: messageServiceSpy}
    ]
  })
});

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'bulletin-board'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('bulletin-board');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('bulletin-board app is running!');
  // });
});
