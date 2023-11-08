import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category.interface';
import { CatalogListItemComponent } from './catalog-list-item/catalog-list-item.component';
import { CustomPipesModule } from 'src/app/pipes/custom-pipes.module';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContextMenuModule,
    CatalogListItemComponent,
    CustomPipesModule
  ],
})
export class CatalogListComponent implements OnInit, OnDestroy {
  @Input() catalogId: string;
  public root: Category;
  private destroy$ = new Subject();

  constructor(
    private _categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this._categoryService.rootCategory.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (rootCategory) => {
        if(rootCategory) this.root = rootCategory
      }
    })
  };

  ngOnDestroy(): void {
    this.destroy$.next('stop');
    this.destroy$.complete();
  };

};
