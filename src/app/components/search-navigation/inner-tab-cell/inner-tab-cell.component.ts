
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/model/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-inner-tab-cell',
  templateUrl: './inner-tab-cell.component.html',
  styleUrls: ['./inner-tab-cell.component.scss']
})
export class InnerTabCellComponent implements OnInit, OnDestroy{
  @Input() category: Category;
  public childCategories: Category[];
  public longMenu: boolean;
  private destroy$ = new Subject();

  constructor(
    private _categoryService: CategoryService,
    private _searchService: SearchService,
  ){}

  ngOnInit(): void {
    this._categoryService.getCategory(this.category.id).pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (category: Category) => {
        if(category.childs) {
          this.childCategories = category.childs;
          this.longMenu = this.childCategories.length > 6 ? true : false;
        }
      }
    });
  };

  ngOnDestroy(): void {
      this.destroy$.next('stop');
      this.destroy$.complete();
  };

  checked(id: string):void {
    this._searchService.setSearchCategory(id);
  };

  openMenu(event: MouseEvent): void {
    this.longMenu = false;
  };
};
