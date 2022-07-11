import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromAppState from '../../models/app-state.model';
import * as RecipesActions from "../../store/actions/recipes.actions";


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeId: number;
  isEditMode = false;
  recipeForm: FormGroup;
  private storeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppState.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.isEditMode = params['id'] !== undefined;
      this.initForm();
    });
  };

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImgPath = '';
    let recipeIngredients = new FormArray([]);

    if(this.isEditMode) {
      this.storeSubscription = this.store.select('recipes').pipe(map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.recipeId;
        });
      })).subscribe(editedRecipe => {
        recipeName = editedRecipe.name;
        recipeDescription = editedRecipe.description;
        recipeImgPath = editedRecipe.imagePath;

        if(editedRecipe['ingredients']) {
          for(let ingredient of editedRecipe.ingredients) {
            recipeIngredients.push(new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          };
        };
      })
    };

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      ingredients: recipeIngredients
    });
  };

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  };

  onSubmit() {
    if(this.isEditMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({idx: this.recipeId, newRecipe: this.recipeForm.value}));
    }else{
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    };
    this.onCancel(); 
  };

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  };

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  };

  onDeleteIngredient(idx: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(idx);
  };

  ngOnDestroy(): void {
    if(this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    };
  };
};