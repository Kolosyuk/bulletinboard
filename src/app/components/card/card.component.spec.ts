import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting} 
    from '@angular/common/http/testing';

import { CardComponent } from './card.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Advert } from 'src/app/model/advert.interface';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    const advertServiceSpy = jasmine.createSpyObj('AdvertsService', ['getAdvertById']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getCurrentUser']);
    const mockData: Advert = {
      id: 123,
      user: {
        adverts: [],
        id: '',
        name: '',
        registeredTime: '',
        role: ''
      },
      name: '',
      description: '',
      isActive: false,
      imagesIds: ['1234-1234'],
      cost: 0,
      email: '',
      phone: '',
      location: '',
      createdAt: '',
      category: {
        id: '',
        parentId: '',
        name: '',
        childs: []
      }
    }

    await TestBed.configureTestingModule({
      imports: [
        CardComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: ActivatedRoute,
        useValue: {
          params: of({id: 123})
        }}
        
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.data = mockData
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
});
