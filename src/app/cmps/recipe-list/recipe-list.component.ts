import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import * as fromAppState from '../../models/app-state.model';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromAppState.AppState>
  ) { };

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  };

  onNewRecipe() {
    this.router.navigateByUrl('/recipes/new');
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };
};