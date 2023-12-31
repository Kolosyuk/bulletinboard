import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Advert } from '../../model/advert.interface';
import { RouterModule } from '@angular/router';
import { imageSrcCreator } from '../../helpers/image-src-creator';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { AdvertsService } from 'src/app/services/advert.service';
import { UserService } from 'src/app/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    RouterModule,
    DatePipe,
    CurrencyPipe,
    ContextMenuModule
  ]
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() data: Advert;
  @Input() personal: boolean;
  public link: string;
  public mainImgSrc: string;
  public menuOptions: MenuItem[] = [
    {
      label: "Удалить объявление",
      command: () => this.delete(),
    },
  ];
  private destroy$ = new Subject();

  constructor(
    private _advertService: AdvertsService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.link = `/advert/${this.data.id}`;
    this.mainImgSrc = imageSrcCreator(this.data.imagesIds[0]);
  };

  ngOnDestroy(): void {
    this.destroy$.next('stop');
    this.destroy$.complete();
  };

  delete() {
    this._advertService.deleteAdvertById(this.data.id).pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      error: (err) => console.log('Ошибка при удалении объявления', err),
      complete: () => this._userService.getCurrentUser()
    });
  };
};
