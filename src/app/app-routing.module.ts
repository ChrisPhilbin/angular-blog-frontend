import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'signin', component: AuthComponent },
  { path: 'category/:id', component: CategoriesComponent },
  { path: 'posts/new', component: CreatePostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
