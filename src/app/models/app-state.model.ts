import * as fromShoppingList from '../models/shopping-list-state.model';
import * as fromAuth from '../models/auth-state.model';
import * as fromRecipes from '../models/recipes-state.model';

export interface AppState {
    shoppingList: fromShoppingList.ShoppingListState;
    auth: fromAuth.AuthState;
    recipes: fromRecipes.RecipesState;
};