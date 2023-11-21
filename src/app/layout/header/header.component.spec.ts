import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchNavigationComponent } from "../../components/search-navigation/search-navigation.component";
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        SearchNavigationComponent
      ],
      imports: [
        RouterTestingModule,
        DividerModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        provideHttpClient(),
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
