import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerTabComponent } from './inner-tab.component';

describe('InnerTabComponent', () => {
  let component: InnerTabComponent;
  let fixture: ComponentFixture<InnerTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnerTabComponent]
    });
    fixture = TestBed.createComponent(InnerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
