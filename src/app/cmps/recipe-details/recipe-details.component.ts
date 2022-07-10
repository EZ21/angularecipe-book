import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { };

  ngOnInit(): void {
  };

  onAddIngredientsToShoppingList() {
    const ingredientsDeepCopy = JSON.parse(JSON.stringify(this.recipe.ingredients));
    this.recipeService.addIngredientsToShoppingList(ingredientsDeepCopy);
  };
};