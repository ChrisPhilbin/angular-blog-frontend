import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Post } from 'src/app/models/posts-model';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  isAuthenticated = false;
  postForm!: FormGroup;
  showCategoryModal = false;
  //@ts-ignore
  firebaseCategories;
  editMode = false;
  editPostId = '';
  //@ts-ignore
  editPost: Post = {}
  postTitle: string = '';
  postCategory: string = '';
  postBody: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private postService: PostsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    const localToken = localStorage.getItem("AuthToken");
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false: true;
      if (!this.isAuthenticated && !localToken) {
        this.router.navigate(['/signin']);
      }
    })

    this.categoriesService.showNewCategoryModal.subscribe((res) => {
      this.showCategoryModal = res;
    })

    this.categoriesService.getFirebaseCategories();
    this.categoriesService.firebaseCategories.subscribe((categories) => {
      this.firebaseCategories = categories;
      console.log(this.firebaseCategories);
    })

    this.route.paramMap.subscribe((params) => {
      if (params.get('postId')) {
        this.editMode = true;
        this.editPostId = params.get('postId') as string;
        this.postService.getSinglePost(this.editPostId)
        this.postService.singlePost.subscribe((post) => {
          this.editPost = post;
          this.postTitle = post.title as string;
          this.postBody = post.body as string;
          this.postCategory = post.category as string;
          this.initPostForm();
      })
      } else {
        this.initPostForm();
      }
    })

    // if (this.editMode) {
    //   this.postService.getSinglePost(this.editPostId)
    //   this.postService.singlePost.subscribe((post) => {
    //     this.editPost = post;
    //   })
    // }

    // this.initPostForm();
  }

  initPostForm() {

    this.postForm = new FormGroup({
      title: new FormControl(this.postTitle, Validators.required),
      body: new FormControl(this.postBody, Validators.required),
      category: new FormControl(this.postCategory, Validators.required)
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

  onUpdatePost() {
    const newPost = {
      title: this.postForm.value['title'],
      body: this.postForm.value['body'],
      category: this.postForm.value['category'],
    };

    this.postService.updateFirebasePost(this.editPostId, newPost);
  }

  get postFormControl() {
    return this.postForm.controls;
  }

  toggleCreateCategory() {
    console.log('toggling')
    this.categoriesService.showNewCategoryModal.next(true);
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      []
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

}
