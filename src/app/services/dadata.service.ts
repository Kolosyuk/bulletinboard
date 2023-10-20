import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_DADATA_SUGGESTION } from 'src/environment';
import { DadataSuggestDTO } from '../model/dadata.interface';

@Injectable({
  providedIn: 'root'
})

export class DadataService {

  constructor(
    private _http: HttpClient,
  ) { }

  getSuggestion(query: string) {
    // count(необяз) - количество предположений, по умолчанию 10, макс 20
    const body = JSON.stringify({"query": query, "count": 20})
    
    const options = {
      headers : new HttpHeaders({"Accept": "application/json", "Content-Type": "application/json"})
    }

    return this._http.post<DadataSuggestDTO>(API_DADATA_SUGGESTION, body, options)
  }
}
