import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/posts-model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  fetchedPosts: Post[] = [];
  postsSubscription = new Subscription();
  isLoggedIn = false;

  constructor(private postsService: PostsService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.postsService.getRecentPosts(3);
    // this.postsSubscription = this.postsService.fetchedPosts.subscribe(
    //   (posts) => {
    //     this.fetchedPosts = posts;
    //   }
    // );
    this.postsService.getFirebasePosts();
    this.postsSubscription = this.postsService.firebasePosts.subscribe((posts) => {
      this.fetchedPosts = posts;
      console.log(this.fetchedPosts)
    })

    this.authService.user.subscribe((user) => {
      this.isLoggedIn = !user ? false : true;
    })
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

  handleEditPost(postId: string) {
    console.log(postId, "postId")
    this.router.navigate([`/posts/${postId}/edit`]);
  }

  handleDeletePost(postId: string) {
    if (window.confirm("Are you sure?")) {
      this.postsService.deleteFirebasePost(postId);
    }
  }

}
