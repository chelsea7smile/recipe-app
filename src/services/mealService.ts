import { Meal } from '@/types/meal';
import { api } from '@/services/api';

export const mealService = {
  async searchMeals(query: string): Promise<Meal[]> {
    const response = await api.get(`/search.php?s=${query}`);
    return response.data.meals || [];
  },

  async getMealsByFirstLetter(letter: string): Promise<Meal[]> {
    const response = await api.get(`/search.php?f=${letter}`);
    return response.data.meals || [];
  },

  async getMealById(id: string): Promise<Meal> {
    const response = await api.get(`/lookup.php?i=${id}`);
    return response.data.meals[0];
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get('/list.php?c=list');
    return response.data.meals.map((meal: { strCategory: string }) => meal.strCategory);
  },

  async getRandomMeal(): Promise<Meal> {
    const response = await api.get('/random.php');
    return response.data.meals[0];
  },
}; 