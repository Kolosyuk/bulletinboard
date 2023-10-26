import { Component } from '@angular/core';
import { Advert } from 'src/app/model/advert.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss'],
})
export class LkComponent {
  public adverts: Advert[] | undefined;

  constructor(
    private _userService: UserService
    ) {}

  ngOnInit(): void {
    this.adverts = this._userService.getAdvertisments()
  };
};
