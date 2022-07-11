import { Ingredient } from "src/app/models/ingredient.model";
import { ShoppingListState } from "src/app/models/shopping-list-state.model";
import * as ShoppingListActions from "../actions/shopping-list.actions";


const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIdx: -1
};


export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            let addedIngredients = [...state.ingredients];
            const ingredientToAdd = action.payload.ingredient;
            const idx = addedIngredients.findIndex(ingredient => ingredient.name === ingredientToAdd.name);

            if(idx === -1) {
                addedIngredients.push(ingredientToAdd);
            } else {
                addedIngredients[idx] = {
                    ...addedIngredients[idx],
                    amount: addedIngredients[idx].amount + ingredientToAdd.amount
                };
            };

            if(action.payload.isUpdateChange) {
                addedIngredients = [...addedIngredients];
            };

            return {
                ...state,
                ingredients: [...addedIngredients]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            const ingredientsCopy = [...state.ingredients]
            const ingredientsToAdd = [...action.payload.ingredients]
            
            ingredientsToAdd.forEach(ingredient => {
                const ingredientToAdd = ingredient;
                const idx = ingredientsCopy.findIndex((ingredient) => ingredient.name === ingredientToAdd.name);
                
                if(idx === -1) {
                    ingredientsCopy.push(ingredientToAdd);
                } else {
                    ingredientsCopy[idx] = {
                        ...ingredientsCopy[idx],
                        amount: ingredientsCopy[idx].amount + ingredientToAdd.amount
                    };
                };
            });

            return {
                ...state,
                ingredients: [...ingredientsCopy]
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIdx];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIdx] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIdx: -1
            };
        
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, ingredientIdx) => {
                    return ingredientIdx !== state.editedIngredientIdx;
                }),
                editedIngredient: null,
                editedIngredientIdx: -1
            };

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIdx: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIdx: -1
            };
        
        default:
            return state;
    };
};