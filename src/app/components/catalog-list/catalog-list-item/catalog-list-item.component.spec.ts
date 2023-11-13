import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogListItemComponent } from './catalog-list-item.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CatalogListItemComponent', () => {
  let component: CatalogListItemComponent;
  let fixture: ComponentFixture<CatalogListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalogListItemComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    fixture = TestBed.createComponent(CatalogListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
