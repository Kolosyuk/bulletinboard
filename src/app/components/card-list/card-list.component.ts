import { Component, Input } from '@angular/core';
import { Advert } from 'src/app/model/advert.interface';
import { CardComponent } from '../card/card.component';
import { CardNewAdvComponent } from '../card-new-adv/card-new-adv.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  standalone: true,
  imports: [
    CardComponent,
    CardNewAdvComponent,
    NgForOf,
    NgIf
  ],
})
export class CardListComponent{
  @Input()adverts: Advert[];
  @Input()personal: boolean;
}
