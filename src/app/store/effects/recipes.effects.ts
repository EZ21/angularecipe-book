import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Recipe } from "src/app/models/recipe.model";
import { environment } from "src/environments/environment";
import * as RecipesActions from '../actions/recipes.actions';
import * as fromAppState from '../../models/app-state.model';


@Injectable()
export class RecipesEffects {
    fetchRecipes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.FETCH_RECIPES),
            switchMap(() => {
                return this.http.get<Recipe[]>(`${environment.firebaseProjURL}/recipes.json`);
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return ({ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] });
                });
            }),
            map(recipes => {
                return new RecipesActions.SetRecipes(recipes);
            })
        );
    });

    storeRecipes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                return this.http.put(
                    `${environment.firebaseProjURL}/recipes.json`,
                    recipesState.recipes
                );
            })
        );
    },
    {dispatch: false}
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromAppState.AppState>
    ) {};
};