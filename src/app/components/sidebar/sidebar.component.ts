import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/categories-model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private _categoriesService: CategoriesService) {}

  categories: Category[] = [];

  ngOnInit(): void {
    //@ts-ignore
    this.categories = this._categoriesService.fetchedCategories.subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
  }
}
