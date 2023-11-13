import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InnerTabCellComponent } from './inner-tab-cell.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomPipesModule } from 'src/app/pipes/custom-pipes.module';

describe('InnerTabCellComponent', () => {
  let component: InnerTabCellComponent;
  let fixture: ComponentFixture<InnerTabCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnerTabCellComponent],
      imports: [CustomPipesModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    fixture = TestBed.createComponent(InnerTabCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});