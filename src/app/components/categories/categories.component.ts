import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../models/posts-model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categoryId: string | null = '';
  categoryPosts: Post[] = [];
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params['id'] as string;
      this.isLoading = true;
      this.postsService.getFirebasePostsByCategory(this.categoryId);
      this.postsService.firebasePosts.subscribe((posts) => {
        this.categoryPosts = posts;
        this.isLoading = false;
      });
    });
  }
}
