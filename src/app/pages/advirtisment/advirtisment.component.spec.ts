import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvirtismentComponent } from './advirtisment.component';

describe('AdvirtismentComponent', () => {
  let component: AdvirtismentComponent;
  let fixture: ComponentFixture<AdvirtismentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvirtismentComponent]
    });
    fixture = TestBed.createComponent(AdvirtismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
