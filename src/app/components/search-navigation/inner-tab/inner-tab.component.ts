import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/model/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-inner-tab',
  templateUrl: './inner-tab.component.html',
  styleUrls: ['./inner-tab.component.scss']
})
export class InnerTabComponent implements OnInit, OnDestroy{
  @Input() category: Category;
  public childCategories: Category[];
  private destroy$ = new Subject();

  constructor(
    private _categoryService: CategoryService,
    private _searchService: SearchService,
  ){}

  ngOnInit(): void {
    this._categoryService.getCategory(this.category.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (category: Category) => {
        if(category.childs) {
          this.childCategories = category.childs
        }
      }
    });
  };

  ngOnDestroy(): void {
      this.destroy$.next('stop');
      this.destroy$.complete();
  };

  checked(id: string): void {
    this._searchService.setSearchCategory(id);
  };
};
