import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, of, switchMap, take } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { Store } from '@ngrx/store';
import * as fromAppState from '../models/app-state.model';
import * as RecipesActions from '../store/actions/recipes.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromAppState.AppState>,
    private actions$: Actions,
  ){ };

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => {
      return recipesState.recipes;
    }),
    switchMap(recipes => {
      if(recipes.length === 0) {
        this.store.dispatch(new RecipesActions.FetchRecipes());
        return this.actions$.pipe(
          ofType(RecipesActions.SET_RECIPES),
          take(1)
        );
      } else {
        return of(recipes);
      };
    }));
  };
};