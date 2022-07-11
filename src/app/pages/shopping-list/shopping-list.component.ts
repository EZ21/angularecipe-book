import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../../models/ingredient.model';
import * as fromAppState from '../../models/app-state.model';
import * as ShoppingListActions from "../../store/actions/shopping-list.actions";

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromAppState.AppState>) { };

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  };

  onEditIngredient(ingredientIdx: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(ingredientIdx));
  };
};