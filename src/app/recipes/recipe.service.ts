import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Big Fat Burger',
    //         'What else you need to say?',
    //         'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/5/5/0/FNM_060115-Fatbuger-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1431449537270.jpeg',
    //         [
    //             new Ingredient('Meat',1),
    //             new Ingredient('Buns',2),
    //             new Ingredient('Pickles',2),
    //             new Ingredient('Lettuce',1),
    //             new Ingredient('Tomato',1),
    //             new Ingredient('Sauce',1)
    //         ]
    //         ),
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super-tasty Schnitzil - just awesome!',
    //         'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg',
    //         [
    //             new Ingredient('Meat',1),
    //             new Ingredient('Parsley',2),
    //             new Ingredient('Lemon',2)
    //         ]
    //         )
    //   ];
    private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService) {}

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
        this.slService.addIngredients(ingredients);
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