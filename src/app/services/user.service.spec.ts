import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  const loginServiceSpy = jasmine.createSpyObj('LoginService', ['getAuthorizationToken']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
