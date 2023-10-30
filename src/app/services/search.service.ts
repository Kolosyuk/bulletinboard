import { Injectable } from '@angular/core';
import { SearchForm } from '../model/forms.interface';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Advert } from '../model/advert.interface';
import { API_BASE } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public form: SearchForm = {
    search: '',
    showNonActive: true,
    category: null
  };
  public searchResult: Subject<Advert[]> = new Subject<Advert[]>();

  constructor(
    private _http: HttpClient
  ) { }

  setSearchQuery(query: string): void {
    this.form.search = query;
  };

  setSearchCategory(category: string): void {
    this.form.category = category;
  };

  resetForm(): void {
    this.form.search = '';
    this.form.category = null;
  };

  search(): void {
    console.log(this.form);
    
    this._http.post<Advert[]>(`${API_BASE}/advert/search`, this.form)
    .subscribe({
      next: (adverts) => this.searchResult.next(adverts),
      error: (err) => console.log(`При поиске произошла ошибка: ${err}`),
      complete: () => this.resetForm()
    });
  };
};
