import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeAboutComponent } from 'src/app/cmps/recipe-about/recipe-about.component';
import { RecipeDetailsComponent } from 'src/app/cmps/recipe-details/recipe-details.component';
import { RecipeEditComponent } from 'src/app/cmps/recipe-edit/recipe-edit.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RecipesResolver } from 'src/app/services/recipes.resolver';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeAboutComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolver] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { };