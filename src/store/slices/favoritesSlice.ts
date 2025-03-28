import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteMeal, Meal } from '@/types/meal';
import { combineIngredients } from '@/utils/mealUtils';
import { RootState } from '../index';

const FAVORITES_STORAGE_KEY = 'favorites';

const loadFavoritesFromStorage = (): FavoriteMeal[] => {
  if (typeof window === 'undefined') return [];
  try {
    const storedData = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

interface FavoritesState {
  items: FavoriteMeal[];
}

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state: FavoritesState, action: PayloadAction<Meal>) => {
      const meal = action.payload;
      const existingIndex = state.items.findIndex(
        (item: FavoriteMeal) => item.idMeal === meal.idMeal
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({ ...meal, quantity: 1 });
      }

      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.items));
    },

    removeFavorite: (state: FavoritesState, action: PayloadAction<string>) => {
      const mealId = action.payload;
      state.items = state.items.filter((item: FavoriteMeal) => item.idMeal !== mealId);

      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.items));
    },

    updateQuantity: (
      state: FavoritesState,
      action: PayloadAction<{ mealId: string; quantity: number }>
    ) => {
      const { mealId, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter((item: FavoriteMeal) => item.idMeal !== mealId);
      } else {
        const index = state.items.findIndex((item: FavoriteMeal) => item.idMeal === mealId);
        if (index >= 0) {
          state.items[index].quantity = quantity;
        }
      }

      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.items));
    },

    clearFavorites: (state: FavoritesState) => {
      state.items = [];
      localStorage.removeItem(FAVORITES_STORAGE_KEY);
    },
  },
});

export const { addFavorite, removeFavorite, updateQuantity, clearFavorites } =
  favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.items;

export const selectIsFavorite = (mealId: string) =>
  createSelector(selectFavorites, (favorites: FavoriteMeal[]) => {
    return favorites.some((item: FavoriteMeal) => item.idMeal === mealId);
  });

export const selectCombinedIngredients = createSelector(
  selectFavorites,
  (favorites: FavoriteMeal[]) => combineIngredients(favorites)
);

export default favoritesSlice.reducer;
