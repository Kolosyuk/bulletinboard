import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/model/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-search-navigation',
  templateUrl: './search-navigation.component.html',
  styleUrls: ['./search-navigation.component.scss']
})
export class SearchNavigationComponent implements OnInit, OnDestroy{
  public isVisible: boolean;
  public menuItems: Category[];
  public classes: string = '';
  private destroy$ = new Subject();

  constructor(
    public menuService: MenuService,
    public categoryService: CategoryService,
  ) {};

  ngOnInit() {
    this.categoryService.rootCategory.pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data: Category|null) => {
        if(data) {
          this.menuItems = data.childs as Category[]
        };
      }
    });
    this.menuService.isVisible$.pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (status: boolean) => this.classes = status ? 'translate-y-0' : '-translate-y-100'
    });
  };

  ngOnDestroy(): void {
      this.destroy$.next('stop');
      this.destroy$.complete();
  }
};
