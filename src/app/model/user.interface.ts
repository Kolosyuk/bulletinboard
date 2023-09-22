import { Cards } from './card.interface'

export interface User {
  id: string;
  name: string;
  phone: number;
  adress: string;
  advertisments: Cards;
}