import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-inner-tab',
  templateUrl: './inner-tab.component.html',
  styleUrls: ['./inner-tab.component.scss']
})
export class InnerTabComponent implements OnInit{
  @Input() category: Category;
  public childCategories: Category[];

  constructor(
    private _categoryService: CategoryService,
    private _searchService: SearchService,
  ){}

  ngOnInit(): void {
    this._categoryService.getCategory(this.category.id).subscribe({
      next: (category: Category) => {
        if(category.childs) {
          this.childCategories = category.childs
        }
      }
    });
  };

  checked(id: string): void {
    this._searchService.setSearchCategory(id);
  }
};
