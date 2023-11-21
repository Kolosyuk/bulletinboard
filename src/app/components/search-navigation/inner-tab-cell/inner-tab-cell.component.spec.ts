import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InnerTabCellComponent } from './inner-tab-cell.component';
import { provideHttpClient } from '@angular/common/http';
import { CustomPipesModule } from 'src/app/pipes/custom-pipes.module';
import { mockCategory } from 'src/test-enviroments';

describe('InnerTabCellComponent', () => {
  let component: InnerTabCellComponent;
  let fixture: ComponentFixture<InnerTabCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnerTabCellComponent],
      imports: [CustomPipesModule],
      providers: [
        provideHttpClient(),
      ]
    });
    fixture = TestBed.createComponent(InnerTabCellComponent);
    component = fixture.componentInstance;
    component.category = mockCategory;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});