import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../models/categories-model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  fetchedCategories = new Subject<Category[]>();

  constructor(private http: HttpClient) {}

  getCategories() {
    this.http
      .get<Category[]>('https://chrisphilbin.net/wp-json/wp/v2/categories')
      .subscribe((categories: Category[]) => {
        this.fetchedCategories.next(categories);
      });
  }
}
