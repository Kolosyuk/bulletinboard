import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

  describe('creation', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          RegistrationComponent,
          ToastComponentStub
        ],
        imports: [
          RouterTestingModule,
          PasswordModule,
          InputMaskModule,
          ButtonModule,
          FormsModule,
          ReactiveFormsModule,
          
        ],        
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          {provide: MessageService, useValue: messageServiceSpy}
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(RegistrationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});

@Component({selector: 'p-toast', template: ''})
    class ToastComponentStub {
}
