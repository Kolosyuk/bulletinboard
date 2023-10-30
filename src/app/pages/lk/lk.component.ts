import { Component } from '@angular/core';
import { Advert } from 'src/app/model/advert.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss'],
})
export class LkComponent {
  public adverts: Advert[] | null;

  constructor(
    private _userService: UserService
    ) {}

  ngOnInit(): void {
    this._userService.getCurrentUser();
    this._userService.userAdverts.subscribe((adverts: Advert[]|null) => {
        this.adverts = adverts
    });
  };
};
