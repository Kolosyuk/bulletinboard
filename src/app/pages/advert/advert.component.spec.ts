import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvertComponent } from './advert.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SkeletonModule } from 'primeng/skeleton';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { mockAdvert } from 'src/test-enviroments';

describe('AdvertComponent', () => {
  let component: AdvertComponent;
  let fixture: ComponentFixture<AdvertComponent>;
  let advertTitle: HTMLElement;
  let advertPrice: HTMLElement;
  let advertLocation: HTMLElement;
  let advertPhone: HTMLElement;
  let advertDescrition: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertComponent],
      imports: [
        RouterTestingModule,
        SkeletonModule,
        GalleriaModule,
        ButtonModule,
        DialogModule,
        DividerModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideHttpClient(),
      ]
    });
    fixture = TestBed.createComponent(AdvertComponent);
    component = fixture.componentInstance;
    component.advert = mockAdvert;
    component.loading = false;    
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title `test advert` with obtained advert object', () => {
    advertTitle = fixture.nativeElement.querySelector('.cell-title');
    expect(advertTitle.textContent).toContain('test advert');
  });

  it('should display `100` in cost with obtained advert object', () => {
    advertPrice = fixture.nativeElement.querySelector('.cell-price');
    expect(advertPrice.textContent).toContain('100');
  });

  it('should display `test location` in address with obtained advert object', () => {
    advertLocation = fixture.nativeElement.querySelector('.cell-adress');
    expect(advertLocation.textContent).toContain('test location');
  });

  it('should display phone `8-800-888-88-88` with obtained advert object', () => {
    component.visible = true;
    fixture.detectChanges();
    advertPhone = fixture.nativeElement.querySelector('.phone');
    expect(advertPhone.textContent).toContain('8-800-888-88-88');
  });

  it('should display test description with obtained advert object', () => {
    advertDescrition = fixture.nativeElement.querySelector('.cell-description');
    expect(advertDescrition.textContent).toContain('description for stub advert');
  });
});
