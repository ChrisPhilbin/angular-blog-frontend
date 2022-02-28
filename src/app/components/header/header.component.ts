import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/categories-model';
import { FirebaseCategory } from 'src/app/models/firebase-categories-model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  categoriesSubscription = new Subscription();
  // categories: Category[] = [];
  categories: FirebaseCategory[] = [];
  isAuthenticated = false;
  userSubscription = new Subscription();

  constructor(private categoriesService: CategoriesService, private authService: AuthService) {}

  ngOnInit(): void {
    // this.categoriesService.getCategories();
    this.categoriesService.getFirebaseCategories();
    // this.categoriesSubscription =
    //   this.categoriesService.fetchedCategories.subscribe((categories) => {
    //     this.categories = categories;
    //   });
    this.categoriesSubscription = this.categoriesService.firebaseCategories.subscribe((categories) => {
      this.categories = categories;
    })

    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    })
  }

  ngOnDestroy(): void {
      this.categoriesSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
  }
}
