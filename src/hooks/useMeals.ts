import { useQuery } from '@tanstack/react-query';
import { mealService } from '../services/mealService';
import { Meal } from '@/types/meal';

export function useMealsSearch(query: string) {
  return useQuery<Meal[]>({
    queryKey: ['meals', 'search', query],
    queryFn: () => mealService.searchMeals(query),
    enabled: true,
  });
}

export function useMealsByFirstLetter(letter: string) {
  return useQuery<Meal[]>({
    queryKey: ['meals', 'byFirstLetter', letter],
    queryFn: () => mealService.getMealsByFirstLetter(letter),
    enabled: letter.length === 1,
  });
}

export function useMealById(id: string) {
  return useQuery<Meal>({
    queryKey: ['meals', 'byId', id],
    queryFn: () => mealService.getMealById(id),
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: mealService.getCategories,
  });
}

export function useRandomMeal() {
  return useQuery<Meal>({
    queryKey: ['meals', 'random'],
    queryFn: mealService.getRandomMeal,
  });
}
