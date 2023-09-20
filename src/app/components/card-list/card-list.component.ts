import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Cards } from 'src/app/model/card.interface';
import { CardComponent } from '../card/card.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
  ]
})
export class CardListComponent implements OnInit {

  public cards: Cards;

  constructor(private _cardService: CardsService) {
  }

  ngOnInit(): void {
    this._cardService.getCards().subscribe((data: Cards) => {
      this.cards = data;
    });
  };
}
