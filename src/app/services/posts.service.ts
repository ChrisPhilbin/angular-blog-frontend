import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/posts-model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  fetchedPosts = new Subject<Post[]>();
  categoryPosts = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getRecentPosts(postsAmount: number): void {
    this.http
      .get<Post[]>(
        `https://chrisphilbin.net/wp-json/wp/v2/posts?per_page=${postsAmount}`
      )
      .subscribe((posts: Post[]) => {
        this.fetchedPosts.next(posts);
      });
  }

  getPostsByCategory(id: string | null): void {
    console.log(id, 'ID');
    this.http
      .get<Post[]>(
        `https://chrisphilbin.net/wp-json/wp/v2/posts?categories=${id}`
      )
      .subscribe((posts) => {
        this.categoryPosts.next(posts);
      });
  }
}
