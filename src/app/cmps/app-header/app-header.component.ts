import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromAppState from '../../models/app-state.model';
import * as AuthActions from '../../store/actions/auth.actions';
import * as RecipesActions from '../../store/actions/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  navbarCollapsed: boolean = true;
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(private store: Store<fromAppState.AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  };

  // HAMBURGER MENU:
  onToggleNavbarCollapsed(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  };
  
  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes())
  };

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  };

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  };

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  };
};