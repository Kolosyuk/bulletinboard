import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNavigationComponent } from './search-navigation.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SearchNavigationComponent', () => {
  let component: SearchNavigationComponent;
  let fixture: ComponentFixture<SearchNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchNavigationComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    fixture = TestBed.createComponent(SearchNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
