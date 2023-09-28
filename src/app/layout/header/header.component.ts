import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { UserService } from 'src/app/services/user.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit{
  
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
  ]

  constructor (
    public loginService: LoginService,
    public messageService: MessageService,
    public userService: UserService
    ) {}

    ngOnInit(): void {
      this.loginService.isAuthenticated.subscribe()
    }
}
