import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-search-navigation',
  templateUrl: './search-navigation.component.html',
  styleUrls: ['./search-navigation.component.scss']
})
export class SearchNavigationComponent implements OnInit{
  public isVisible: boolean;
  public menuItems: Category[];
  public classes: string = '';

  constructor(
    public menuService: MenuService,
    public categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.categoryService.rootCategory.subscribe( data => {
      if(data) {
        this.menuItems = data.childs as Category[]
      }
    });
    this.menuService.isVisible$.subscribe(status => {
      this.classes = status ? 'translate-y-0' : '-translate-y-100' ;
    })
  };
}
