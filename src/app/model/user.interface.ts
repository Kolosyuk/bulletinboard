import { Advert } from './advert.interface'

export interface User {
  adverts: Advert[];
  id: string;
  name: string;
  registeredTime: string;
  role: string;
};