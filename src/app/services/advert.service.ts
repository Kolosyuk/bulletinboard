import { Injectable } from '@angular/core';
import { Advert } from '../model/advert.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdvertsService {
  constructor(private _httpClient: HttpClient) { }

  getAdverts(): Observable<Advert[]> {
    const body = {
      search: "",
      showNonActive: true
    };
    return this._httpClient.post<Advert[]>('http://194.87.237.48:5000/advert/search', body);
  }

  getAdvertById(id: number): Observable<Advert> {
    return this._httpClient.get<Advert>(`http://194.87.237.48:5000/advert/${id}`);
  }

}
