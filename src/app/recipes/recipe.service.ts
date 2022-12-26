import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //     new Recipe(
  //         'Test Recipe',
  //         'This is simply a test',
  //         'https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179856.jpg',
  //         [
  //             new Ingredient('Meat', 1),
  //             new Ingredient('French Fries', 20),
  //         ]),
  //     new Recipe(
  //         'Test Recipe 2',
  //         'This is simply a test 2',
  //         'https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179856.jpg',
  //         [
  //             new Ingredient('buns', 2),
  //             new Ingredient('Meat', 1)
  //         ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
