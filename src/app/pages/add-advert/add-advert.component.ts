import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FileUploadEvent } from 'primeng/fileupload';
import { BehaviorSubject } from 'rxjs';
import { DropDownOption } from 'src/app/model/types';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent implements OnInit, OnDestroy {

   public dropDownOptions = new BehaviorSubject<DropDownOption[]>([]);

  public newAdvertForm : UntypedFormGroup = new UntypedFormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    description: new FormControl(),
    images: new FormControl(),
    cost: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl(),
    phone: new FormControl('', [
      Validators.required
    ]),
    location: new FormControl('', [
      Validators.required
    ]),
    categoryId: new FormControl('', [
    Validators.required
    ]),
  });

  constructor(
    private _categoryService: CategoryService
  ) {
  }
 

  ngOnInit(): void {
    
    this._categoryService.categories.subscribe( categories => {
      for (let category of categories ) {
        let newOptions = [...this.dropDownOptions.getValue(), {name: category.name, value: category.id}]
          this.dropDownOptions.next(newOptions)
      }
      console.log(this.dropDownOptions.getValue());
    })
    
  }

  ngOnDestroy(): void {
    this._categoryService.categories.unsubscribe();
  }

  submit() {
    console.log(this.newAdvertForm.getRawValue());
  }

  onUpload(event: FileUploadEvent) {
    console.log("on upload", event);
    
  }
}
