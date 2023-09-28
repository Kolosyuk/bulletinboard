import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../environment';
import { Image } from '../model/image.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private _http: HttpClient
  ){}

  getImage(id: string) {
    return this._http.get<Image>(`${API_BASE}/images/${id}`)
  }
}
