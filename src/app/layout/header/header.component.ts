import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { UserService } from 'src/app/services/user.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

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
      command: this.authenticationService.logout,
      routerLink: '/'
    },
  ]

  constructor (
    public authenticationService: AuthenticationService,
    public messageService: MessageService,
    public userService: UserService
    ) {}

  ngOnInit(){
    // this.authenticationService.getLoggedInName.subscribe((name) => this.userName = name);
 }
}
