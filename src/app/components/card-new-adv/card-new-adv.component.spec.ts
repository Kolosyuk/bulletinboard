import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNewAdvComponent } from './card-new-adv.component';

describe('CardNewAdvComponent', () => {
  let component: CardNewAdvComponent;
  let fixture: ComponentFixture<CardNewAdvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardNewAdvComponent]
    });
    fixture = TestBed.createComponent(CardNewAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
