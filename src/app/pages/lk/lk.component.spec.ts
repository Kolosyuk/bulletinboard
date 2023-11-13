import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting} 
    from '@angular/common/http/testing';
import { LkComponent } from './lk.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CardListComponent } from 'src/app/components/card-list/card-list.component';

describe('LkComponent', () => {
  let component: LkComponent;
  let fixture: ComponentFixture<LkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LkComponent],
      imports: [CardListComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
