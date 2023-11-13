import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerTabComponent } from './inner-tab.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomPipesModule } from 'src/app/pipes/custom-pipes.module';
import { DividerModule } from 'primeng/divider';

describe('InnerTabComponent', () => {
  let component: InnerTabComponent;
  let fixture: ComponentFixture<InnerTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        InnerTabComponent
      ],
      imports: [
        CustomPipesModule,
        DividerModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    fixture = TestBed.createComponent(InnerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
