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
import { ToastModule } from 'primeng/toast';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  describe('creation', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [RegistrationComponent],
        imports: [
          RouterTestingModule,
          PasswordModule,
          InputMaskModule,
          ButtonModule,
          FormsModule,
          ReactiveFormsModule,
          ToastModule,        
        ],        
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          MessageService
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