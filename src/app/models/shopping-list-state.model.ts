import { Ingredient } from "./ingredient.model";

export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIdx: number;
};