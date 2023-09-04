import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Cards } from 'src/app/model/card.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  public cards: Cards;

  constructor(private _cardService: CardsService) {
  }

  ngOnInit(): void {
    this.cards = this._cardService.getCards();
    console.log(this.cards);
  }

}
