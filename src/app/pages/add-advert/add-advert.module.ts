import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAdvertRoutingModule } from './add-advert-routing.module';
import { AddAdvertComponent } from './add-advert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    AddAdvertComponent
  ],
  imports: [
    CommonModule,
    AddAdvertRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    FileUploadModule,
    ButtonModule,
    InputMaskModule
  ]
})
export class AddAdvertModule { }
