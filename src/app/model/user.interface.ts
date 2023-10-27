import { Advert } from './advert.interface'

export interface User {
  id: string;
  name: string;
  phone: number;
  adress: string;
  adverts: Advert[];
};