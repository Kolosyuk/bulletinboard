import { Injectable } from '@angular/core';
import { Cards } from '../model/card.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardsService {
  constructor(private _httpClient: HttpClient) { }

  getCards(): Observable<Cards> {
    return this._httpClient.get<Cards>('../../assets/data/advirtisents.json')
;  }

}
