import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardNewAdvComponent } from './card-new-adv.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardNewAdvComponent', () => {
  let component: CardNewAdvComponent;
  let fixture: ComponentFixture<CardNewAdvComponent>;
  let p: HTMLElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CardNewAdvComponent,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(CardNewAdvComponent);
    component = fixture.componentInstance;
    p = fixture.nativeElement.querySelector('p');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    expect(p.textContent).toContain('Новое объявление');
  });
});
