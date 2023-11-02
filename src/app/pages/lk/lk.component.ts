import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, delay, takeUntil } from 'rxjs';
import { Advert } from 'src/app/model/advert.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss'],
})
export class LkComponent implements OnInit, OnDestroy {
  public adverts: Advert[];
  private destroy$ = new Subject();
  public loading: boolean = true;

  constructor(
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._userService.getCurrentUser();
    this._userService.userAdverts.pipe(
      takeUntil(this.destroy$),
      delay(1500)
    )
    .subscribe({
      next: adverts => {
        this.adverts = adverts;
        this.loading = false;
      }
    });
  };

  ngOnDestroy(): void {
    this.destroy$.next('stop');
    this.destroy$.complete();
  };
};
