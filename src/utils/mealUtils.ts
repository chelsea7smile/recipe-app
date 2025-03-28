import { Meal } from '@/types/meal';

export interface Ingredient {
  name: string;
  measure: string;
}

export function getIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;
    const ingredient = meal[ingredientKey] as string;
    const measure = meal[measureKey] as string;

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient,
        measure: measure || '',
      });
    }
  }

  return ingredients;
}

export function combineIngredients(meals: Meal[]): Ingredient[] {
  const ingredientsMap = new Map<string, Ingredient>();

  meals.forEach(meal => {
    const ingredients = getIngredients(meal);
    ingredients.forEach(ingredient => {
      if (!ingredientsMap.has(ingredient.name)) {
        ingredientsMap.set(ingredient.name, ingredient);
      }
    });
  });

  return Array.from(ingredientsMap.values());
}

export function filterMealsByCategory(meals: Meal[], category: string): Meal[] {
  return meals.filter(meal => meal.strCategory === category);
}

export const getPaginatedItems = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};
