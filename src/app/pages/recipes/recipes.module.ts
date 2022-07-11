import { NgModule } from '@angular/core';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeListComponent } from 'src/app/cmps/recipe-list/recipe-list.component';
import { RecipeItemComponent } from 'src/app/cmps/recipe-item/recipe-item.component';
import { RecipeDetailsComponent } from 'src/app/cmps/recipe-details/recipe-details.component';
import { RecipesComponent } from './recipes.component';
import { RecipeAboutComponent } from 'src/app/cmps/recipe-about/recipe-about.component';
import { RecipeEditComponent } from 'src/app/cmps/recipe-edit/recipe-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    RecipesComponent,
    RecipeAboutComponent,
    RecipeEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
