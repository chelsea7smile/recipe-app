import { Meal } from '@/types/meal';
import { RecipeCard } from '@/components/recipe/RecipeCard';

interface FavoritesGridProps {
  meals: Meal[];
  portions: Record<string, number>;
  onPortionChange: (mealId: string, portions: number) => void;
}

export function FavoritesGrid({ meals, portions, onPortionChange }: FavoritesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          meal={meal}
          portions={portions[meal.idMeal] || 1}
          onPortionChange={(newPortions) => onPortionChange(meal.idMeal, newPortions)}
        />
      ))}
    </div>
  );
} 