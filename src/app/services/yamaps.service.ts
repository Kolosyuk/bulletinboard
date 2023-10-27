import { Injectable } from '@angular/core';
import { API_YAMAPS_KEY, API_YAMAPS_GEOCOD } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { YamapsDTO } from '../model/yamaps.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YamapsService {

  constructor(
    private _http: HttpClient
  ){};

  decodeCoordinates(adress:string): Observable<YamapsDTO> {
    return this._http.get<YamapsDTO>(`${API_YAMAPS_GEOCOD}?apikey=${API_YAMAPS_KEY}&geocode=${adress}&format=json&lang=ru_RU`);
  };
};
