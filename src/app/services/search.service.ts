import { Injectable } from '@angular/core';
import { SearchForm } from '../model/forms.interface';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Advert } from '../model/advert.interface';
import { API_BASE } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchCategory: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  public categoryName: string = '';
  public searchQuery: string = '';

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
    this.searchQuery = query;
  };

  setSearchCategory(categoryId: string, categoryName: string = ''): void {
    this.categoryName = categoryName;
    this.searchCategory.next(categoryId);
  };

  resetForm(): void {
    this.searchQuery = '';
    this.searchCategory.next(null);
  };

  search(): Observable<Advert[]> {
    this.form.search = this.searchQuery;
    this.searchCategory.subscribe( x=> this.form.category = x);
    return this._http.post<Advert[]>(`${API_BASE}/advert/search`, this.form).pipe(
      tap((adverts) => this.searchResult.next(adverts))
    )
  };
};
