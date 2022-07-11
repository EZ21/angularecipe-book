import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppState from '../../models/app-state.model';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMsg: string = null;
  private storeSubscription: Subscription;

  constructor(private store: Store<fromAppState.AppState>) { };

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.isLoading;
      this.errorMsg = authState.authError;
    });
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

    if(this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
    } else {
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
    };

    form.reset();
  };

  onHandleAlert() {
    this.store.dispatch(new AuthActions.ClearError());
  };

  ngOnDestroy(): void {
    if(this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    };
  };
};