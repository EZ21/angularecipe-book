import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Hamburger', 'The Big-Fat burger.', 'https://www.thespruceeats.com/thmb/0GBQylFVXB8zizcHIHVrXlBdS2k=/5089x2863/smart/filters:no_upscale()/slow-cooker-hamburgers-recipe-for-kids-2098104-hero-01-3dd9bf2b2ca748358047f2ff4e73b64c.jpg', [
      new Ingredient('Meat', 1),
      new Ingredient('Buns', 2),
      new Ingredient('French Fries', 20),
    ]),
    new Recipe('Schnitzel', 'A tasty schnitzel.', 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [
      new Ingredient('Meat', 1),
      new Ingredient('Salad', 1),
      new Ingredient('French Fries', 20),
    ]),
  ];

  recipesArrayChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { };

  getRecipes() {
    return this.recipes.slice();
  };

  getRecipeById(recipeIdx: number) {
    return this.recipes[recipeIdx];
  };

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  };

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesArrayChanged.next(this.recipes.slice());
  };

  updateRecipe(idx: number, newRecipe: Recipe) {
    this.recipes[idx] = newRecipe;
    this.recipesArrayChanged.next(this.recipes.slice());
  };

  deleteRecipe(idx: number) {
    this.recipes.splice(idx, 1);
    this.recipesArrayChanged.next(this.recipes.slice());
  };
};