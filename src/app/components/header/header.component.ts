import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/categories-model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categoriesSubscription = new Subscription();
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories();
    this.categoriesSubscription =
      this.categoriesService.fetchedCategories.subscribe((categories) => {
        this.categories = categories;
        console.log(categories);
      });
  }
}
