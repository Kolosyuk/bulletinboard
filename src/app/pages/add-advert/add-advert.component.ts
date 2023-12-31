import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { FileRemoveEvent, FileSelectEvent } from 'primeng/fileupload';
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';
import { DropDownOption, Options } from 'src/app/model/types';
import { CategoryService } from 'src/app/services/category.service';
import { AdvertsService } from 'src/app/services/advert.service';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DadataService } from 'src/app/services/dadata.service';
import { DadataSuggestDTO, Suggestion } from 'src/app/model/dadata.interface';
import { Category } from 'src/app/model/category.interface';

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
  private destroy$ = new Subject();
  
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

  public get categoryIds(): FormArray<any> {
    return <FormArray>this.newAdvertForm.get('categoryIds');
  };

  getCategoryControls(): FormGroup[] {
    return this.categoryIds.controls as FormGroup[];
  };

  calculateLevel(level: number): string {
    return `level${level}`;
  };

  filterAddress(event: AutoCompleteCompleteEvent): void {
    this._dadateService.getSuggestion(event.query).pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (value: DadataSuggestDTO) => {
        if(value) {
          this.filteredAddress = value.suggestions
        }
      }
    });
  };

  _setDropdown(level: number, arrOfOptions: Options[]): void {
    const key : string = `level${level}`;
    this.dropDownOptions[key] = arrOfOptions;
  };

  _patchDropdown(level: number): DropDownOption {
    const key : string = `level${level}`;
    const newOptionsList: DropDownOption = {};
    for (let i = 1; i <= level; i++) {
      newOptionsList[key] = this.dropDownOptions[key]
    };
    return newOptionsList;
  }; 

  ngOnInit(): void {    
    this._categoryService.rootCategory.pipe(
      takeUntil(this.destroy$),
      map((category: Category|null) => {
        if(category && category.childs) {
          return category.childs.map(childCategory => {
            return <Options>{name: childCategory.name, value: childCategory.id}
          })
        } else return null
      })
    ).subscribe({
      next: (options: Options[]|null) => {
        if (options) {
          this._setDropdown(this.menuLevel.getValue(), options);
        }
      }
    });
    this.newAdvertForm.markAllAsTouched();
  };

  ngOnDestroy(): void {
    this.destroy$.next('stop');
    this.destroy$.complete();
  };

  onSelectCategory(event: DropdownChangeEvent, checkedLevel: number): void {
    let sumLevels: number = this.elRef.nativeElement.querySelectorAll(`[data-level]`).length;
    const diff: number = sumLevels - checkedLevel;
    const categoryId : string = event.value;
    if (diff >= 1) {
      for (let index = 1; index <= diff; index++) {
        this.categoryIds.removeAt(-1);
        this.menuLevel.next(--sumLevels);
      }
      this.dropDownOptions = this._patchDropdown(checkedLevel);
    };
    this._categoryService.getCategory(categoryId).pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (cat) => {
        if(cat.childs?.length) {
          const newDropDownOPtions: Options[] = cat.childs.map(category => {
            return {name: category.name, value: category.id}
          })
            
          this.menuLevel.next(++sumLevels);
          this.categoryIds.push(this._getCategoryControl());
          this._setDropdown(this.menuLevel.getValue(), newDropDownOPtions);
        };
        this.isInvalidCategoryForm =this.getCategoryControls().some(item => item.invalid)
      }
    });
  };

  submit(): void {
    const formData : FormData = this._buildFormData();

    this._advertService.postNewAdvert(formData).pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      complete: () => this._router.navigate(['/personal'])
    })
  };

  onAddFile(event: FileSelectEvent): void {  
    this.newAdvertForm.patchValue({
      images: [...event.currentFiles]
    });
  };

  onDeleteFile(event: FileRemoveEvent): void {
    let images: File[] = this.newAdvertForm.get('images')?.value
    images = images.filter((image) => image.name !== event.file.name)

    this.newAdvertForm.patchValue({
      images: [...images]
    });
  };

  _buildFormData(): FormData {
    const fd: FormData = new FormData();
    let categoryId;
    const menuLevelDeep = this.newAdvertForm.get('categoryIds')?.value.length;
    const lastCategory = this.newAdvertForm.get('categoryIds')?.value[menuLevelDeep-1];
    const preLastCategory = this.newAdvertForm.get('categoryIds')?.value[menuLevelDeep-2];
    const address: Suggestion = this.newAdvertForm.get('location')?.value;
       
    if (lastCategory['category']) {
      categoryId = lastCategory['category'];
    } else {
      categoryId = preLastCategory['category'];
    };

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
  };
};
