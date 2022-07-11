import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import * as fromAppState from '../../models/app-state.model';
import * as RecipesActions from "../../store/actions/recipes.actions";
import * as ShoppingListActions from '../../store/actions/shopping-list.actions';


@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppState.AppState>
  ) { };

  ngOnInit(): void {
    this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.recipeId = id;
      return this.store.select('recipes');
    }),
    map(recipesState => {
      return recipesState.recipes.find((recipe, index) => {
        return index === this.recipeId;
      });
    })).subscribe(recipe => {
      this.recipe = recipe;
    });
  };
  
  onAddIngredientsToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients({ingredients: this.recipe.ingredients, isUpdateChange: false}));
  };

  onEditRecipe() {
    this.router.navigate(['./edit'], {relativeTo: this.route});
  };

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipeId));
    this.router.navigateByUrl('/recipes');
  };
};