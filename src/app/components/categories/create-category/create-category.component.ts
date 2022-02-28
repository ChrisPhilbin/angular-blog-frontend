import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styles: [
  ]
})
export class CreateCategoryComponent implements OnInit {

  newCategory = "";

  constructor(private categoriesService: CategoriesService) { }

  showNewCategoryModal = false;

  ngOnInit(): void {
    this.categoriesService.showNewCategoryModal.subscribe((res) => {
      this.showNewCategoryModal = res;
    })
  }

  handleClose() {
    this.categoriesService.showNewCategoryModal.next(false);
  }

  createCategory() {
    if (!this.newCategory) {
      return
    }
    this.categoriesService.createNewCategory(this.newCategory);
  }

}
