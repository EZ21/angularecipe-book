import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './cmps/app-root/app.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { ShoppingEditComponent } from './cmps/shopping-edit/shopping-edit.component';
import { RecipeListComponent } from './cmps/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './cmps/recipe-item/recipe-item.component';
import { RecipeDetailsComponent } from './cmps/recipe-details/recipe-details.component';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { RecipeAboutComponent } from './cmps/recipe-about/recipe-about.component';
import { RecipeEditComponent } from './cmps/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ShoppingListComponent,
    RecipesComponent,
    ShoppingEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    DropdownDirective,
    RecipeAboutComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
