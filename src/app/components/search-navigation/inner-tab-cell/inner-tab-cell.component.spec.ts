import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InnerTabCellComponent } from './inner-tab-cell.component';

describe('InnerTabComponent', () => {
  let component: InnerTabCellComponent;
  let fixture: ComponentFixture<InnerTabCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnerTabCellComponent]
    });
    fixture = TestBed.createComponent(InnerTabCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});