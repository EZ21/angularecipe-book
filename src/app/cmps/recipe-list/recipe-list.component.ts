import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
  ) { };

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  };

  onNewRecipe() {
    this.router.navigateByUrl('/recipes/new');
  };
};