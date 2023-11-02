import { Component, Input } from '@angular/core';
import { Advert } from 'src/app/model/advert.interface';
import { CardComponent } from '../card/card.component';
import { CardNewAdvComponent } from '../card-new-adv/card-new-adv.component';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  standalone: true,
  imports: [
    CardComponent,
    CardNewAdvComponent,
    CommonModule,
    SkeletonModule
  ]
})
export class CardListComponent{
  @Input()adverts: Advert[];
  @Input()personal: boolean;
  @Input()loading: boolean;
  public mockArr: number[] = new Array(12).fill(1);
};
