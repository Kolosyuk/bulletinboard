import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MenuService } from '../../services/menu.service';
import { UserService } from 'src/app/services/user.service';
import { MenuItem, MessageService } from 'primeng/api';

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

  public isVisible: boolean = false;

  constructor (
    public loginService: LoginService,
    public userService: UserService,
    public menuService: MenuService,
    ) {}
    
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
  };