import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/posts-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  fetchedPosts = new Subject<Post[]>();
  categoryPosts = new Subject<Post[]>();
  singlePost = new Subject<Post>();
  firebasePosts = new Subject<Post[]>();

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

  getSinglePost(postId: string): void {
    this.http.get<Post>(`${environment.apiUrl}/posts/${postId}`)
    .subscribe((post: Post) => {
      this.singlePost.next(post)
    })
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

  createNewPost(post: Post): void {
    this.http.post(`${environment.apiUrl}/posts`, {
      body: post.body,
      title: post.title,
      category: post.category,
    }).subscribe((response) => {
      console.log(response, "response from create")
    })
  }

  getFirebasePosts(): void {
    this.http.get<Post[]>(`${environment.apiUrl}/posts`).subscribe((posts: Post[]) => {
      this.firebasePosts.next(posts);
    })
  }

  //@ts-ignore
  updateFirebasePost(postId: string, newPost): void {
    this.http.put<Post>(`${environment.apiUrl}/posts/${postId}`, {
      title: newPost.title,
      body: newPost.body,
      category: newPost.category,
    }).subscribe((updatedPost) => {
      console.log(updatedPost, "updated post")
    })
  }

  deleteFirebasePost(postId: string): void {
    this.http.delete(`${environment.apiUrl}/posts/${postId}`, {
      body: {
        postId: postId
      }
    }).subscribe((res) => {
      this.getFirebasePosts();
    })
  }

  getFirebasePostsByCategory(categoryName: string): void {
    this.http.get<Post[]>(`${environment.apiUrl}/categories/${categoryName}`).subscribe((posts) => {
      this.firebasePosts.next(posts);
    })
  }
}
