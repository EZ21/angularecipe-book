import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  firebaseProjURL: string = 'https://********.firebaseio.com'; // Firebase project URL here

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) { };

  public save() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(`${this.firebaseProjURL}/recipes.json`, recipes).subscribe(response => console.log('response:', response));
  };

  public fetch() {
    return this.http.get<Recipe[]>(`${this.firebaseProjURL}/recipes.json`).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return ({ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] });
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));
  };
};