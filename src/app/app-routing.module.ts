import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeAboutComponent } from './cmps/recipe-about/recipe-about.component';
import { RecipeDetailsComponent } from './cmps/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './cmps/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { RecipesResolver } from './services/recipes.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeAboutComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolver] },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver] },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
