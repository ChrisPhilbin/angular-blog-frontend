import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/posts-model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  fetchedPosts: Post[] = [];
  postsSubscription = new Subscription();

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getRecentPosts(3);
    this.postsSubscription = this.postsService.fetchedPosts.subscribe(
      (posts) => {
        this.fetchedPosts = posts;
      }
    );
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
