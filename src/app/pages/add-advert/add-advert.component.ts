import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { FileRemoveEvent, FileSelectEvent } from 'primeng/fileupload';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DropDownOption, Options } from 'src/app/model/types';
import { CategoryService } from 'src/app/services/category.service';
import { AdvertsService } from 'src/app/services/advert.service';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DadataService } from 'src/app/services/dadata.service';
import { Suggestion } from 'src/app/model/dadata.interface';

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent implements OnInit, OnDestroy {
  public newAdvertForm : UntypedFormGroup;
  public dropDownOptions : DropDownOption = {};
  public menuLevel = new BehaviorSubject(1);
  public  filteredAddress: Suggestion[];
  public isInvalidCategoryForm: boolean = true;
  
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private elRef: ElementRef,
    private _advertService: AdvertsService,
    private _dadateService: DadataService
  ) {
    this._createForm();   
  };

  _createForm() {
    this.newAdvertForm = this._fb.group({
      name: ['', [Validators.required]],
      description: "",
      images: '',
      cost: [0, [Validators.required]],
      email: '',
      phone: ['', [Validators.required]],
      location: ['', [Validators.required]],
      categoryIds: this._fb.array([
        this._getCategoryControl(),
      ]),
    });
  };
  
  _getCategoryControl(): FormGroup {
    return this._fb.group({
      category: ['', [Validators.required]]
    });
  };

  public get categoryIds() {
    return <FormArray>this.newAdvertForm.get('categoryIds');
  };

  getCategoryControls(): FormGroup[] {
    return this.categoryIds.controls as FormGroup[];
  }

  calculateLevel(level: number): string {
    return `level${level}`;
  };

  filterAddress(event: AutoCompleteCompleteEvent ) {
    this._dadateService.getSuggestion(event.query).subscribe( (value) => {
      if(value) {
        this.filteredAddress = value.suggestions
      }
    })
  }

  _setDropdown(level: number, arrOfOptions: Options[]) {
    const key : string = `level${level}`;
    this.dropDownOptions[key] = arrOfOptions
  };

  _patchDropdown(level: number) {
    const key : string = `level${level}`;
    const newOptionsList: DropDownOption = {};
    for (let i = 1; i <= level; i++) {
      newOptionsList[key] = this.dropDownOptions[key]
    };
    return newOptionsList;
  }; 

  ngOnInit(): void {    
    this._categoryService.rootCategory.pipe(
      map(category => {
        if(category && category.childs) {
          return category.childs.map(childCategory => {
            return {name: childCategory.name, value: childCategory.id}
          })
        } else return null
      })
    ).subscribe( options => {
      if (options) {
        this._setDropdown(this.menuLevel.getValue(), options);
      }
    });
    this.newAdvertForm.markAllAsTouched();
    this.newAdvertForm.controls['cost'].setErrors({cost: 'should be more then 0'});
    console.log(this.newAdvertForm.controls['cost'].invalid && (this.newAdvertForm.controls['cost'].touched || this.newAdvertForm.controls['cost'].dirty));
  };

  ngOnDestroy(): void {
    this._categoryService.rootCategory.unsubscribe();
  };

  onSelectCategory(event: DropdownChangeEvent, checkedLevel: number) {
    let sumLevels : number = this.elRef.nativeElement.querySelectorAll(`[data-level]`).length;
    const diff : number = sumLevels - checkedLevel;
    const categoryId : string = event.value;
    if (diff >= 1) {
      for (let index = 1; index <= diff; index++) {
        this.categoryIds.removeAt(-1);
        this.menuLevel.next(--sumLevels);
      }
      this.dropDownOptions = this._patchDropdown(checkedLevel)
    };
    this._categoryService.getCategory(categoryId)
    .subscribe(cat => {
      if(cat.childs?.length) {
        const newDropDownOPtions : Options[] = cat.childs.map(category => {
          return {name: category.name, value: category.id}
        })
          
        this.menuLevel.next(++sumLevels);
        this.categoryIds.push(this._getCategoryControl());
        this._setDropdown(this.menuLevel.getValue(), newDropDownOPtions);
      };
      this.isInvalidCategoryForm =this.getCategoryControls().some(item => item.invalid)
    });
  };

  submit() {
    const formData : FormData = this._buildFormData();

    this._advertService.postNewAdvert(formData).subscribe(() => {
      this._router.navigate(['/personal'])
    })
  };

  onAddFile(event: FileSelectEvent) {  
    this.newAdvertForm.patchValue({
      images: [...event.currentFiles]
    });
  }

  onDeleteFile(event: FileRemoveEvent) {
    let images: File[] = this.newAdvertForm.get('images')?.value
    images = images.filter((image) => image.name !== event.file.name)

    this.newAdvertForm.patchValue({
      images: [...images]
    });
  }

  _buildFormData(): FormData {
    const fd: FormData = new FormData();
    let categoryId;
    const menuLevelDeep = this.newAdvertForm.get('categoryIds')?.value.length;
    const lastCategory = this.newAdvertForm.get('categoryIds')?.value[menuLevelDeep-1];
    const preLastCategory = this.newAdvertForm.get('categoryIds')?.value[menuLevelDeep-2];
    const address : Suggestion = this.newAdvertForm.get('location')?.value;
       
    if (lastCategory['category']) {
      categoryId = lastCategory['category'];
    } else {
      categoryId = preLastCategory['category'];
    }
    fd.append('Name', this.newAdvertForm.get('name')?.value);
    fd.append('Description', this.newAdvertForm.get('description')?.value);
    fd.append('CategoryId', categoryId);
    fd.append('Location', address.value);
    fd.append('Phone', this.newAdvertForm.get('phone')?.value);
    fd.append('Email', this.newAdvertForm.get('email')?.value);
    fd.append('Cost', this.newAdvertForm.get('cost')?.value);
    const files = this.newAdvertForm.get('images')?.value;
    for (let file of files) {
      fd.append('Images', file);
    }
    return fd;
  }
};
