import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  isEditMode = false;

  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
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
      const editedRecipe = this.recipeService.getRecipeById(this.recipeId);
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
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
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
};