import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertComponent } from './advert.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SkeletonModule } from 'primeng/skeleton';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

describe('AdvertComponent', () => {
  let component: AdvertComponent;
  let fixture: ComponentFixture<AdvertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertComponent],
      imports: [
        RouterTestingModule,
        SkeletonModule,
        GalleriaModule,
        ButtonModule,
        DialogModule,
        DividerModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    fixture = TestBed.createComponent(AdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
