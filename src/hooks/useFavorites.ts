import { useCallback } from 'react';
import { Meal, Ingredient } from '@/types/meal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addFavorite as addFavoriteAction,
  removeFavorite as removeFavoriteAction,
  updateQuantity as updateQuantityAction,
  clearFavorites as clearFavoritesAction,
} from '@/store/slices/favoritesSlice';
import { selectFavorites } from '../store/selectors';

interface FavoriteMeal extends Meal {
  quantity: number;
}

export function useFavorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites) as FavoriteMeal[];

  const isFavorite = useCallback(
    (mealId: string) => favorites.some((meal) => meal.idMeal === mealId),
    [favorites]
  );

  const addFavorite = useCallback((meal: Meal) => {
    dispatch(addFavoriteAction(meal));
  }, [dispatch]);

  const removeFavorite = useCallback((mealId: string) => {
    dispatch(removeFavoriteAction(mealId));
  }, [dispatch]);

  const toggleFavorite = useCallback((meal: Meal) => {
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  }, [addFavorite, removeFavorite, isFavorite]);

  const updateQuantity = useCallback((mealId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFavoriteAction(mealId));
    } else {
      dispatch(updateQuantityAction({ mealId, quantity }));
    }
  }, [dispatch]);

  const clearFavorites = useCallback(() => {
    dispatch(clearFavoritesAction());
  }, [dispatch]);

  const getCombinedIngredients = useCallback((): Ingredient[] => {
    const ingredientMap = new Map<string, Ingredient>();

    favorites.forEach((meal) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
        const measure = meal[`strMeasure${i}` as keyof Meal] as string;

        if (ingredient && ingredient.trim()) {
          const key = ingredient.toLowerCase();
          const existingIngredient = ingredientMap.get(key);

          if (existingIngredient) {
            existingIngredient.quantity += ` + ${measure}`;
          } else {
            ingredientMap.set(key, {
              name: ingredient,
              quantity: measure,
            });
          }
        }
      }
    });

    return Array.from(ingredientMap.values());
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    updateQuantity,
    clearFavorites,
    isFavorite,
    getCombinedIngredients,
  };
}
