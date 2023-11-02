import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdvertsService } from '../../services/advert.service';
import { Advert } from 'src/app/model/advert.interface';
import { Subject, delay, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AdvertsService],
})
export class MainComponent implements OnInit, OnDestroy{
  public adverts: Advert[];
  private destroy$ = new Subject();
  public loading: boolean = true;

  constructor(private _advertService: AdvertsService) {
  };

  ngOnInit(): void {
    this._advertService.getAdverts().pipe(
      takeUntil(this.destroy$),
      delay(1500)
    )
    .subscribe({
      next: adverts => this.adverts = adverts,
      complete: () => this.loading = false
    }) 
  };

  ngOnDestroy(): void {
    this.destroy$.next('stop');
    this.destroy$.complete();
  };
};
