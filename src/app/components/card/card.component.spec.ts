import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CardComponent } from './card.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { mockAdvert as data } from 'src/test-enviroments';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardTitle: HTMLElement;
  let cardPrice: HTMLElement;
  let cardAddress: HTMLElement;
  let cardDate: HTMLElement;

  beforeEach(async () => {
    const advertServiceSpy = jasmine.createSpyObj('AdvertsService', ['getAdvertById']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getCurrentUser']);


    await TestBed.configureTestingModule({
      imports: [
        CardComponent,
      ],
      providers: [
        provideHttpClient(),
        {provide: ActivatedRoute,
        useValue: {
          params: of({id: 123})
        }},
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.data = data;
    cardTitle = fixture.nativeElement.querySelector('.card-title');
    cardPrice = fixture.nativeElement.querySelector('.card-price');
    cardAddress = fixture.nativeElement.querySelector('.card-address');
    cardDate = fixture.nativeElement.querySelector('.card-date');
    fixture.detectChanges();
  })
  ;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set src to link', () => {
    expect(component.link).toEqual(`/advert/123`);
  });

  it('should set src to main image', () => {
    expect(component.mainImgSrc).toEqual(`http://194.87.237.48:5000/images/1234-1234`);
  });

  describe('testing HTML markup with obtained advert object', () => {

    it('should display original title `test advert`', () => {
      expect(cardTitle.textContent).toContain('test advert');
    });

    it('should display `100` in cost', () => {
      expect(cardPrice.textContent).toContain('100');
    });

    it('should display `test location` in address', () => {
      expect(cardAddress.textContent).toContain('test location');
    });

    it('should display date `Nov 01, 2023 at 03:00 AM`', () => {
      expect(cardDate.textContent).toContain('Nov 01, 2023 at 03:00 AM');
    });
  });
});
