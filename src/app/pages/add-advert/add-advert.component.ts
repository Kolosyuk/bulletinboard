import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { FileSelectEvent, FileUploadEvent } from 'primeng/fileupload';
import { BehaviorSubject, map } from 'rxjs';
import { Category } from 'src/app/model/category.interface';
import { DropDownOption, Options } from 'src/app/model/types';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent implements OnInit, OnDestroy {
  public newAdvertForm : UntypedFormGroup;
  public dropDownOptions : DropDownOption = {};
  public menuLevel = new BehaviorSubject(1);
  
  // private uploaderContainer: HTMLElement;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private elRef: ElementRef
  ) {
    this._createForm();   
  };

  _createForm() {
    this.newAdvertForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: "",
      images: '',
      cost: [0, [Validators.required]],
      email: '',
      phone: '',
      location: ['', [Validators.required]],
      categoryIds: this._fb.array([
        this._getCategoryControl(),
      ]),
    });
  };
  
  _getCategoryControl(): FormGroup {
    return this._fb.group({
      category: ''
    });
  };

  calculateLevel(level: number): string {
    return `level${level}`;
 };

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

  public get categoryIds() {
    return <FormArray>this.newAdvertForm.get('categoryIds');
  };

  ngOnInit(): void {    
    this._categoryService.categories.pipe(
      map(categories => categories.map(category => {
        return {name: category.name, value: category.id}
      }))
    ).subscribe( options => {
      this._setDropdown(this.menuLevel.getValue(), options)
    });
  };

  ngAfterViewInit() {
    // this.uploaderContainer = this.elRef.nativeElement.querySelector(`.p-fileupload-buttonbar`);

    // this.uploaderContainer.insertAdjacentHTML('beforeend', "<p class='upload-title'>Максимум 10 картинок в формате jpeg, png или heic</p>") 
  };

  ngOnDestroy(): void {
    this._categoryService.categories.unsubscribe();
  };

  onSelectCategory(event: DropdownChangeEvent, checkedLevel: number) {
    let sumLevels = this.elRef.nativeElement.querySelectorAll(`[data-level]`).length;
    const diff = sumLevels - checkedLevel;
    const categoryId = event.value;
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
    });
  };

  submit() {
    console.log(this.newAdvertForm.getRawValue());
  };

  onImageSelect(event: FileSelectEvent) {
    console.log("image files", event.currentFiles);

    let file = event.files[0];
    let reader = new FileReader();

    reader.onloadend = function() {
        console.log('RESULT', reader.result)
    }
    // reader.readAsArrayBuffer(file);
    console.log(reader.readAsArrayBuffer(file));
  };
};
