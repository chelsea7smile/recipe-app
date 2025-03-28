import { Meal } from '@/types/meal';
import { RecipeCard } from './RecipeCard';

interface RecipeGridProps {
  meals: Meal[];
  isLoading?: boolean;
}

export function RecipeGrid({ meals, isLoading = false }: RecipeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
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

  if (meals.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-xl font-medium text-muted-foreground">
            No recipes found
          </h3>
          <p className="mt-2">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
