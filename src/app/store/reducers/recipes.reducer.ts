import { RecipesState } from "src/app/models/recipes-state.model";
import * as RecipesActions from "../actions/recipes.actions";

const initialState: RecipesState = {
    recipes: []
};


export function recipesReducer(state: RecipesState = initialState, action: RecipesActions.RecipesActions) {
    switch (action.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };

        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };

        case RecipesActions.UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[action.payload.idx],
                ...action.payload.newRecipe
            };
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.idx] = updatedRecipe;

            return {
                ...state,
                recipes: updatedRecipes
            };

        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return index !== action.payload;
                })
            };

        default:
            return state;
    };
};