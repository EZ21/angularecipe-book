import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from 'src/app/models/auth-response-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  isLoading = false;
  errorMsg: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { };

  ngOnInit(): void {
  };

  onSwitchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  };

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    };
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authObservable$: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObservable$ = this.authService.login(email, password);
    } else {
      authObservable$ = this.authService.signup(email, password);
    };

    authObservable$.subscribe({next: (responseData) => {
      this.isLoading = false;
      this.router.navigateByUrl('/recipes');
    }, error: errorRes => {
      this.errorMsg = `${errorRes}`;
      this.isLoading = false;
    }});

    form.reset();
  };
};