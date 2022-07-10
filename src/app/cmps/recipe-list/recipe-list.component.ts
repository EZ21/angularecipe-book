import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];

  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
  ) { };

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesArrayChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  };

  onNewRecipe() {
    this.router.navigateByUrl('/recipes/new');
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };
};