import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Advert } from 'src/app/model/advert.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss'],
})
export class LkComponent implements OnInit, OnDestroy {
  public adverts: Advert[] | null;
  private destroy$ = new Subject();

  constructor(
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._userService.getCurrentUser();
    this._userService.userAdverts.pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((adverts: Advert[]|null) => {
        this.adverts = adverts
    });
  };

  ngOnDestroy(): void {
    this.destroy$.next('stop');
    this.destroy$.complete();
  };
};
