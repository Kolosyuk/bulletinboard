import { Injectable } from '@angular/core';
import { Cards, Card } from '../model/card.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardsService {
  constructor(private _httpClient: HttpClient) { }

  getCards(): Observable<Cards> {
    return this._httpClient.get<Cards>('../../assets/data/advirtisents.json');
  }

  getCardById(id: number): Observable<Cards> {
        
    //TODO clutch, change when API will be ready
    return this._httpClient.get<Cards>('../../assets/data/advirtisents.json').pipe(
      map(cards => cards.filter(card => card.id === id))
    );
  }

}
