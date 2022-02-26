import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  isAuthenticated = false;
  postForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private postService: PostsService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false: true;
      if (!this.isAuthenticated) {
        this.router.navigate(['/signin']);
      }
    })
    this.initPostForm();
  }

  initPostForm() {
    let postTitle = "";
    let postBody = "";
    let postCategory = "";

    this.postForm = new FormGroup({
      title: new FormControl(postTitle, Validators.required),
      body: new FormControl(postBody, Validators.required),
      category: new FormControl(postCategory, Validators.required)
    })
  }

  onPostSubmit() {
    const newPost = {
      title: this.postForm.value['title'],
      body: this.postForm.value['body'],
      category: this.postForm.value['category'],
    }

    //@ts-ignore
    this.postService.createNewPost(newPost)
  }

}
