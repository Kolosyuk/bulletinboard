import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MenuService } from '../../services/menu.service';
import { UserService } from 'src/app/services/user.service';
import { MenuItem, MessageService } from 'primeng/api';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit, OnDestroy{  
  public menuItems: MenuItem[] = [
    {
      label: "Мои объявления",
      routerLink: "/personal",
    },
    {
      label: "Настройки",
      routerLink: "/personal/settings"
    },
    {
      label: "Выйти",
      command: () => this.loginService.logout(),
      routerLink: '/'
    },
  ];
  public searchForm: UntypedFormGroup;
  public isVisible: boolean = false;

  constructor (
    public loginService: LoginService,
    public userService: UserService,
    public menuService: MenuService,
    private _searchService: SearchService,
    private _router: Router,
    private _fb: FormBuilder
    ) {
      this._createSearchForm();
    }

    _createSearchForm(): void {
      this.searchForm = this._fb.group({
        search: [''],
        category: [''],
      })
    };
    
    ngOnInit(): void {
      this.loginService.isAuthenticated.subscribe()
    };
    
    ngOnDestroy(): void {
      this.loginService.isAuthenticated.unsubscribe()
    };

    toggleMenu(): void {
      if(this.menuService.isVisible$.getValue()){
        this.menuService.close();
        this.isVisible = false;
        return
      }
      this.menuService.open();
      this.isVisible = true;
    };

    search(): void {
      const searchQuery: string = this.searchForm.get('search')?.value;
      this._searchService.setSearchQuery(searchQuery.toLocaleLowerCase());
      this._searchService.search();
      if (this._router.url === '/search') return;
      this._router.navigate(['/search']);
    };
  };