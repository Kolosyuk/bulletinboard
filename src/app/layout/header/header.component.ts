import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MenuService } from '../../services/menu.service';
import { UserService } from 'src/app/services/user.service';
import { MenuItem, MessageService } from 'primeng/api';
import { SearchService } from 'src/app/services/search.service';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subject, filter, takeUntil, tap } from 'rxjs';

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
  private currentUrl: string;
  private destroy$ = new Subject();

  constructor (
    public loginService: LoginService,
    public userService: UserService,
    public menuService: MenuService,
    private _searchService: SearchService,
    private _router: Router,
    private _fb: FormBuilder,
    ) {
      this._createSearchForm();
      this._router.events.pipe(
        takeUntil(this.destroy$),
        filter(e => e instanceof NavigationEnd),
        tap((res) => {
          if(this.currentUrl !== this._router.url) {
            if(this.isVisible) this.toggleMenu();
            this.currentUrl = this._router.url;
          }
        })
      )
      .subscribe();
    };

    _createSearchForm(): void {
      this.searchForm = this._fb.group({
        search: [''],
        category: [''],
      })
    };
    
    ngOnInit(): void {
      this.loginService.isAuthenticated.pipe(takeUntil(this.destroy$)).subscribe();
      this.currentUrl = this._router.url;
    };
    
    ngOnDestroy(): void {
      this.destroy$.next('stop');
      this.destroy$.complete();
    };

    toggleMenu(): void {
      if(this.isVisible){
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
      this._searchService.search().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        error: (err) => console.log(`При поиске произошла ошибка: ${err}`),
        complete: () => {
          this._searchService.resetForm();
          this.searchForm.reset();
        }
      });
      if (this._router.url === '/search') return;
      this._router.navigate(['/search']);
    };
  };