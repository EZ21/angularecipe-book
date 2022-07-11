import * as fromShoppingList from '../../store/reducers/shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAppState from '../../models/app-state.model';
import * as fromAuth from './auth.reducer';
import * as fromRecipes from './recipes.reducer';

export const appReducer: ActionReducerMap<fromAppState.AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipesReducer
};