import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form', {static: false}) shoppingListForm: NgForm;

  subscription: Subscription;
  isEditMode = false;
  editedIngredientIdx: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { };

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (idx: number) => {
        this.editedIngredientIdx = idx;
        this.isEditMode = true;
        this.editedItem = this.shoppingListService.getIngredient(idx);
        this.shoppingListForm.setValue({
          nameInput: this.editedItem.name,
          amountInput: this.editedItem.amount
        });
      });
  };

  onSubmit(form: NgForm) {
    const ingredientName = form.value.nameInput;
    const ingredientAmount = form.value.amountInput;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    if(this.isEditMode) {
      this.shoppingListService.updateIngredient(this.editedIngredientIdx, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    };

    this.isEditMode = false;
    form.reset();
  };

  onClearForm() {
    this.shoppingListForm.reset();
    this.isEditMode = false;
  };

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedIngredientIdx);
    this.onClearForm();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };
};