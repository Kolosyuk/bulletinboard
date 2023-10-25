import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertComponent } from './advert.component';

describe('AdvirtismentComponent', () => {
  let component: AdvertComponent;
  let fixture: ComponentFixture<AdvertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertComponent]
    });
    fixture = TestBed.createComponent(AdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
