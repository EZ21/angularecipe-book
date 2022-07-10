import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
  ){ };

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if(!recipes.length) {
      return (this.dataStorageService.fetch());
    } else {
      return recipes;
    };
  };
};