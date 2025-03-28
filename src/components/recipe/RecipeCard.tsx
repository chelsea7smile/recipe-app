import { Meal } from '@/types/meal';
import { useFavorites } from '@/hooks/useFavorites';
import { RecipeCardBase } from './RecipeCardBase';

interface RecipeCardProps {
  meal: Meal;
  portions?: number;
  onPortionChange?: (portions: number) => void;
}

export function RecipeCard({ meal, portions, onPortionChange }: RecipeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <RecipeCardBase
      meal={meal}
      showPortions={portions !== undefined}
      onPortionChange={onPortionChange}
      onFavoriteToggle={toggleFavorite}
      isFavorite={isFavorite(meal.idMeal)}
    />
  );
}
