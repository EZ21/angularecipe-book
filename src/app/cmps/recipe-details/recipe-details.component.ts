import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  
  recipe: Recipe;
  recipeId: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) { };

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.recipeId);
    });
  };

  onAddIngredientsToShoppingList() {
    const ingredientsDeepCopy = JSON.parse(JSON.stringify(this.recipe.ingredients));
    this.recipeService.addIngredientsToShoppingList(ingredientsDeepCopy);
  };

  onEditRecipe() {
    this.router.navigate(['./edit'], {relativeTo: this.route});
  };

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigateByUrl('/recipes');
  };
};