import { Meal } from '@/types/meal';
import apiClient from './apiClient';
import { API_ENDPOINTS } from '@/constants/api';
import { MealsResponse, CategoriesResponse, MealResponse } from '@/types/api';

interface FilterResponse {
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }>;
}

export const mealService = {
  searchMeals: async (query: string): Promise<Meal[]> => {
    const { data } = await apiClient.get<MealsResponse>(`/search.php?s=${query}`);
    return data.meals || [];
  },

  getMealById: async (id: string): Promise<Meal | null> => {
    const { data } = await apiClient.get<MealResponse>(`/lookup.php?i=${id}`);
    return data.meals?.[0] || null;
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await apiClient.get<CategoriesResponse>('/categories.php');
    return data.categories.map(category => category.strCategory);
  },

  getRandomMeal: async (): Promise<Meal | null> => {
    const { data } = await apiClient.get<MealResponse>('/random.php');
    return data.meals?.[0] || null;
  },

  filterByCategory: async (category: string): Promise<Meal[]> => {
    try {
      const { data } = await apiClient.get<FilterResponse>(
        API_ENDPOINTS.FILTER,
        {
          params: { c: category },
        }
      );

      if (!data.meals) return [];

      const mealPromises = data.meals.map(meal =>
        mealService.getMealById(meal.idMeal)
      );

      const meals = await Promise.all(mealPromises);
      return meals.filter((meal): meal is Meal => meal !== null);
    } catch (error) {
      console.error('Error filtering by category:', error);
      return [];
    }
  },
};
