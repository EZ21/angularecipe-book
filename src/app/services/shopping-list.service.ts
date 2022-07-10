import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  ingredientsArrayChanged = new Subject<Ingredient[]>();

  constructor() { };

  getIngredients() {
    return this.ingredients.slice();
  };

  addIngredient(ingredientToAdd: Ingredient) {
    this.ingredients.push(ingredientToAdd);
    this.ingredientsArrayChanged.next(this.ingredients.slice());
  };

  addIngredients(ingredientsToAdd: Ingredient[]) {
    this.ingredients.push(...ingredientsToAdd);
    this.ingredientsArrayChanged.next(this.ingredients.slice());
  };
};