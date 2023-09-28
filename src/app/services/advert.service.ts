import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../environment';
import { Advert } from '../model/advert.interface';
import { Observable } from 'rxjs';


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
    return this._httpClient.post<Advert[]>(`${API_BASE}/advert/search`, body);
  }

  getAdvertById(id: number): Observable<Advert> {
    return this._httpClient.get<Advert>(`${API_BASE}/advert/${id}`);
  }

}
