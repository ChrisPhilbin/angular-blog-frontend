import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/categories-model';
import { FirebaseCategory } from '../models/firebase-categories-model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  fetchedCategories = new Subject<Category[]>();
  showNewCategoryModal = new BehaviorSubject<boolean>(false);

  firebaseCategories = new Subject<FirebaseCategory[]>();

  constructor(private http: HttpClient) {}

  getCategories(): void {
    this.http
      .get<Category[]>('https://chrisphilbin.net/wp-json/wp/v2/categories')
      .subscribe((categories: Category[]) => {
        this.fetchedCategories.next(categories);
      });
  }


  // createNewPost(post: Post): void {
  //   this.http.post(`${environment.apiUrl}/posts`, {
  //     body: post.body,
  //     title: post.title,
  //     category: post.category,
  //   }).subscribe((response) => {
  //     console.log(response, "response from create")
  //   })
  // }

  createNewCategory(categoryName: string): void {
    this.http.post(`${environment.apiUrl}/categories`, {
      name: categoryName
    }).subscribe((response) => {
      this.getFirebaseCategories();
    })
  }

  getFirebaseCategories(): void {
    this.http.get(`${environment.apiUrl}/categories`).subscribe((categories) => {
      //@ts-ignore
      this.firebaseCategories.next(categories)
    })
  }
}
