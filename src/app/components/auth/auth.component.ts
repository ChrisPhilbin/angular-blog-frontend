import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
  ]
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  isLoginMode = true;
  isLoading = false;
  error: string = "";

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }

    const { username, email, password, confirmPassword } = form.value;

    if (!this.isLoginMode && password !== confirmPassword) {
      this.error = "Passwords do not match."
      return;
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe((response) => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, (errorMessage) => {
      this.error = errorMessage
      this.isLoading = false;
    })

    form.reset();

  }

}
