import { Meal } from '@/types/meal';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchMeals(query: string): Promise<Meal[]> {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }

  const data = await response.json();
  return data.meals || [];
}

export async function fetchMealById(id: string): Promise<Meal> {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch meal');
  }

  const data = await response.json();
  const meal = data.meals?.[0];
  
  if (!meal) {
    throw new Error('Meal not found');
  }

  return meal;
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/list.php?c=list`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await response.json();
  return data.meals.map((meal: { strCategory: string }) => meal.strCategory);
} 