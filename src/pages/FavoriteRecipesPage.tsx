import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { fetchMealById } from '@/api/meals';
import { useFavorites } from '@/hooks/useFavorites';
import { Meal } from '@/types/meal';

export function FavoriteRecipesPage() {
  const { favorites } = useFavorites();
  const [portions, setPortions] = useState<Record<string, number>>({});

  const { data: meals = [], isLoading } = useQuery<Meal[], Error>({
    queryKey: ['favorites', favorites],
    queryFn: async () => {
      const meals = await Promise.all(
        favorites.map((favorite) => fetchMealById(favorite.idMeal))
      );
      return meals;
    },
    enabled: favorites.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const handlePortionChange = (mealId: string, newPortions: number) => {
    setPortions((prev) => ({
      ...prev,
      [mealId]: newPortions,
    }));
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse"
          >
            <div className="aspect-video bg-gray-100" />
            <div className="p-5">
              <div className="h-6 bg-gray-100 rounded w-3/4 mb-3" />
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-100 rounded-full w-24" />
                <div className="h-6 bg-gray-100 rounded-full w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">
          You don't have any favorite recipes yet
        </h3>
        <p className="mt-2">
          Add recipes to your favorites to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          meal={meal}
          portions={portions[meal.idMeal] || 1}
          onPortionChange={(newPortions) => handlePortionChange(meal.idMeal, newPortions)}
        />
      ))}
    </div>
  );
} 