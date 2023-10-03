import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from 'src/environment';
import { Category } from '../model/category.interface';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories = new BehaviorSubject<Category[]>([]);

  constructor(
    private _http: HttpClient
  ) {
    this.getRootCategories();  
  }

  getRootCategories() {
    this._http.get<Category[]>(`${API_BASE}/Categories`).pipe(
      map <Category[], Category[]>(categories => {
        categories = categories.filter(cat => cat.parentId === "00000000-0000-0000-0000-000000000000")
        return categories
      })      
      ).subscribe(categories => {
      this.categories.next(categories);
    })
  };

  getCategory(id : string) {
    return this._http.get<Category>(`${API_BASE}/Categories/${id}`)
  };
};



