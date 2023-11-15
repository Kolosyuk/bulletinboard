import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogListItemComponent } from './catalog-list-item.component';
import { provideHttpClient } from '@angular/common/http';
import { mockCategory } from 'src/test-enviroments';

describe('CatalogListItemComponent', () => {
  let component: CatalogListItemComponent;
  let fixture: ComponentFixture<CatalogListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalogListItemComponent],
      providers: [
        provideHttpClient(),
      ]
    });
    fixture = TestBed.createComponent(CatalogListItemComponent);
    component = fixture.componentInstance;
    component.item = mockCategory
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
