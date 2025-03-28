import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RecipeDetails } from '@/components/recipe/RecipeDetails';
import { fetchMealById } from '@/api/meals';
import { Meal } from '@/types/meal';

export function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const [portions, setPortions] = useState(1);

  const { data: meal, isLoading, error } = useQuery<Meal, Error>({
    queryKey: ['meal', id],
    queryFn: () => fetchMealById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="aspect-video bg-gray-100 rounded-lg mb-8" />
        <div className="space-y-8">
          <div>
            <div className="h-8 bg-gray-100 rounded w-3/4 mb-4" />
            <div className="flex gap-3">
              <div className="h-6 bg-gray-100 rounded-full w-24" />
              <div className="h-6 bg-gray-100 rounded-full w-24" />
            </div>
          </div>
          <div>
            <div className="h-6 bg-gray-100 rounded w-1/4 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 bg-gray-100 rounded"
                />
              ))}
            </div>
          </div>
          <div>
            <div className="h-6 bg-gray-100 rounded w-1/4 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 bg-gray-100 rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">
          Error loading recipe
        </h3>
        <p className="mt-2">{error.message}</p>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">
          Recipe not found
        </h3>
      </div>
    );
  }

  return (
    <RecipeDetails
      meal={meal}
      portions={portions}
      onPortionChange={setPortions}
    />
  );
} 