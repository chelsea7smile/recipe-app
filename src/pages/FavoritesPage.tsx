import { useQuery } from '@tanstack/react-query';
import { fetchMealById } from '@/api/meals';
import { useFavorites } from '@/hooks/useFavorites';
import { Meal } from '@/types/meal';
import { IngredientsList } from '@/components/recipe/IngredientsList';
import { useIngredients } from '@/hooks/useIngredients';
import { usePortions } from '@/hooks/usePortions';
import { FavoritesHeader } from '@/components/favorites/FavoritesHeader';
import { FavoritesGrid } from '@/components/favorites/FavoritesGrid';
import { FavoritesEmpty } from '@/components/favorites/FavoritesEmpty';

export function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const { portions, setPortionsForMeal } = usePortions();
  const { combineIngredients } = useIngredients();

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

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorite recipes?')) {
      clearFavorites();
    }
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
    return <FavoritesEmpty />;
  }

  const combinedIngredients = combineIngredients(meals, portions);

  return (
    <div className="space-y-8">
      <FavoritesHeader onClearFavorites={handleClearFavorites} />
      <FavoritesGrid
        meals={meals}
        portions={portions}
        onPortionChange={setPortionsForMeal}
      />
      <div className="mt-8">
        <IngredientsList
          ingredients={combinedIngredients}
          title="Combined Ingredients"
        />
      </div>
    </div>
  );
}
