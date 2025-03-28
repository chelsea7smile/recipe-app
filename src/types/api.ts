import { Meal } from './meal';

export interface MealsResponse {
  meals: Meal[] | null;
}

export interface CategoriesResponse {
  categories: Array<{
    strCategory: string;
  }>;
}

export interface MealResponse {
  meals: Meal[] | null;
} 