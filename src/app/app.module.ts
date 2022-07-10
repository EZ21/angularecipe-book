import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './cmps/app-root/app.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { ShoppingEditComponent } from './cmps/shopping-edit/shopping-edit.component';
import { RecipeListComponent } from './cmps/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './cmps/recipe-item/recipe-item.component';
import { RecipeDetailsComponent } from './cmps/recipe-details/recipe-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { RecipeAboutComponent } from './cmps/recipe-about/recipe-about.component';
import { RecipeEditComponent } from './cmps/recipe-edit/recipe-edit.component';
import { AuthComponent } from './cmps/auth/auth.component';
import { LoadingSpinnerComponent } from './cmps/loading-spinner/loading-spinner.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
