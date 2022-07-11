// TEMPLATE DRIVEN FORM
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import * as ShoppingListActions from '../../store/actions/shopping-list.actions';
import * as fromAppState from '../../models/app-state.model';


@Component({
  selector: 'shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) shoppingListForm: NgForm;
  subscription: Subscription;
  isEditMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromAppState.AppState>) { };

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIdx > -1) {
        this.isEditMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppingListForm.setValue({
          nameInput: this.editedItem.name,
          amountInput: this.editedItem.amount
        });
      } else {
        this.isEditMode = false;
      }
    });
  };

  onSubmit(form: NgForm) {
    const ingredientName = form.value.nameInput;
    const ingredientAmount = form.value.amountInput;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    if(this.isEditMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient({ingredient: newIngredient, isUpdateChange: true}));
    };

    this.isEditMode = false;
    form.reset();
  };

  onClearForm() {
    this.shoppingListForm.reset();
    this.isEditMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  };

  onDeleteIngredient() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClearForm();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  };
};