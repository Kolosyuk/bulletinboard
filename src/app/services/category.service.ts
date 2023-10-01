import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from 'src/environment';
import { Category } from '../model/category.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories = new BehaviorSubject<Category[]>([])

  constructor(
    private _http: HttpClient
  ) {
    this.getCategories();  
   }

  getCategories() {
    this._http.get<Category[]>(`${API_BASE}/Categories`).subscribe(categories => {
      this.categories.next(categories);
    })
  }
}



