import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LkComponent } from './lk.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CardListComponent } from 'src/app/components/card-list/card-list.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

describe('LkComponent', () => {
  let component: LkComponent;
  let fixture: ComponentFixture<LkComponent>;
  const response: any[] = ['1', '2'];
  let userServiceSpy= jasmine.createSpyObj('UserService', {
    'getCurrentUser': () => {}
  },
  {
    'userAdverts$': of(response),
  }
  );
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LkComponent],
      imports: [
        CardListComponent,
        RouterTestingModule
      ],
      providers: [
        provideHttpClient(),
        UserService
        // {provide: UserService, useValue: userServiceSpy}
      ]
    });
    fixture = TestBed.createComponent(LkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive users adverts', () => {
    const userService = TestBed.inject(UserService);
    spyOnProperty<UserService, any>(userService, 'userAdverts$')
    component.getAdverts();
    fixture.detectChanges();
    expect(userService.userAdverts$).toHaveBeenCalledTimes(1);
    // expect(component.adverts).toEqual(response);
  });
});