import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];

  private IngredientSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { };

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.IngredientSubscription = this.shoppingListService.ingredientsArrayChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  };

  ngOnDestroy(): void {
    this.IngredientSubscription.unsubscribe();
  };
};