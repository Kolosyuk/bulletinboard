import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category.interface';
import { CustomPipesModule } from 'src/app/pipes/custom-pipes.module';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-catalog-list-item',
  templateUrl: './catalog-list-item.component.html',
  styleUrls: ['./catalog-list-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContextMenuModule,
    CustomPipesModule
  ]
})
export class CatalogListItemComponent implements OnInit {
  @Input() item: Category;
  destroyRef = inject(DestroyRef);
  public isRolledUp: boolean = true;
  public hasChild: boolean = false;
  public isChecked: boolean = false;

  constructor(
    private _categoryService: CategoryService,
    private _searchService: SearchService
  ) {}

  ngOnInit() {
    this._categoryService.getCategory(this.item.id).pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (item) => {
        this.item = item;
        if(item.childs.length > 0){
          this.hasChild = true
        };
      },
    });
    this._searchService.searchCategory.pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(cat => {
      if(this.isChecked && cat !== this.item.id) {
        this.isChecked = false;
      }
      if(!this.isChecked && cat === this.item.id) {
        this.isChecked = true;
      }
    })
  };

  toggleRolledUpList(): void {
    this.isRolledUp = !this.isRolledUp;
  };

  selectionFn(id: string): void {
    if(this.hasChild) {
      this.toggleRolledUpList();
      return
    };
    if(!this.isChecked) {
      this._searchService.setSearchCategory(id, this.item.name);
      this.isChecked = true;
    } else {
      this._searchService.setSearchCategory('');
    };
  };
};
