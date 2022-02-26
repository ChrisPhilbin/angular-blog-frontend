import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this._categoriesService.getCategories();
  }

  title = 'angular-blog-frontend';
}
