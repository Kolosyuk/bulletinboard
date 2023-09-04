import { Injectable } from '@angular/core';
import { Cards } from '../model/card.interface';
import data from '../data/advirtisents.json';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  constructor() { }

  cards: Cards = data;

  getCards(): Cards {
    return this.cards;
  }

}
