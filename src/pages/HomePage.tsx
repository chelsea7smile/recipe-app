import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { SearchBar } from '@/components/recipe/SearchBar';
import { CategoryFilter } from '@/components/recipe/CategoryFilter';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Pagination } from '@/components/recipe/Pagination';
import { filterMealsByCategory } from '@/utils/mealUtils';
import { Meal } from '@/types/meal';
import { fetchMeals } from '@/api/meals';

const ITEMS_PER_PAGE = 8;

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const {
    data: meals = [],
    isLoading,
    isError,
    error,
  } = useQuery<Meal[], Error>({
    queryKey: ['meals', debouncedSearchQuery],
    queryFn: () => fetchMeals(debouncedSearchQuery),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const filteredMeals = selectedCategory
    ? filterMealsByCategory(meals, selectedCategory)
    : meals;

  const pageCount = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMeals = filteredMeals.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory, debouncedSearchQuery]);

  const handlePageChange = (selectedPage: number) => {
    setIsPageLoading(true);
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsPageLoading(false), 500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-none mb-8">
        <h1 className="text-4xl font-bold mb-6">Discover Recipes</h1>
        <div className="space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for recipes..."
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {isError ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-medium text-destructive mb-4">
                Error loading recipes
              </h3>
              <p className="text-lg text-muted-foreground">
                {error.message || 'Please try again later'}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <RecipeGrid meals={paginatedMeals} isLoading={isLoading} />
            </div>
            <div className="flex-none mt-8">
              <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                isLoading={isPageLoading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
