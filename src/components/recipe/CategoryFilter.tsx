import { useCategories } from '@/hooks/useMeals';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-32 bg-muted rounded-full animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onSelectCategory('')}
        className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-200 cursor-pointer ${
          selectedCategory === ''
            ? 'bg-primary text-primary-foreground shadow-md scale-105'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-200 cursor-pointer ${
            selectedCategory === category
              ? 'bg-primary text-primary-foreground shadow-md scale-105'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
