import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from 'src/environment';
import { Category } from '../model/category.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public rootCategory = new BehaviorSubject<Category|null>(null);

  constructor(
    private _http: HttpClient
  ) {
    this.getCategory().subscribe(categories => {
            this.rootCategory.next(categories);
  });  
  }

  getCategory(id:string = "00000000-0000-0000-0000-000000000000"):Observable<Category> {
    return this._http.get<Category>(`${API_BASE}/Categories/${id}`)
  };
};



