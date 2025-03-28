import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Meal } from '@/types/meal';
import { Heart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useIngredients } from '@/hooks/useIngredients';
import { usePortions } from '@/hooks/usePortions';

interface RecipeCardBaseProps {
  meal: Meal;
  showPortions?: boolean;
  onPortionChange?: (portions: number) => void;
  onFavoriteToggle?: (meal: Meal) => void;
  isFavorite?: boolean;
  className?: string;
}

export function RecipeCardBase({
  meal,
  showPortions = false,
  onPortionChange,
  onFavoriteToggle,
  isFavorite = false,
  className = '',
}: RecipeCardBaseProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { getIngredients } = useIngredients();
  const { portions } = usePortions();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onFavoriteToggle?.(meal);
  };

  const handlePortionClick = (increment: boolean) => {
    if (!onPortionChange) return;
    const currentPortions = portions[meal.idMeal] || 1;
    const newPortions = increment ? currentPortions + 1 : Math.max(1, currentPortions - 1);
    onPortionChange(newPortions);
  };

  return (
    <motion.div
      className={`bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link to={`/recipe/${meal.idMeal}`} className="block flex-none">
        <div className="relative aspect-video">
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsImageLoading(false)}
          />
          {onFavoriteToggle && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-white hover:bg-white/90 transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          )}
        </div>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/recipe/${meal.idMeal}`}>
          <h3 className="font-medium text-lg mb-2 hover:text-primary transition-colors">
            {meal.strMeal}
          </h3>
        </Link>
        <div className="flex justify-between items-center mb-3">
          <span className="px-3 py-1 text-sm text-muted-foreground border border-muted rounded-full">
            {meal.strCategory}
          </span>
          <span className="px-3 py-1 text-sm text-muted-foreground border border-muted rounded-full">
            {meal.strArea}
          </span>
        </div>
        {showPortions && onPortionChange && (
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm text-muted-foreground">Portions:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePortionClick(false)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{portions[meal.idMeal] || 1}</span>
              <button
                onClick={() => handlePortionClick(true)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        <div className="mt-3">
          <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
          <div className="space-y-0.5">
            {getIngredients(meal, portions[meal.idMeal] || 1)
              .slice(0, 3)
              .map((item, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  • {item.name}: {item.quantity}
                </div>
              ))}
            {getIngredients(meal, portions[meal.idMeal] || 1).length > 3 && (
              <div className="text-sm text-muted-foreground">
                and {getIngredients(meal, portions[meal.idMeal] || 1).length - 3} more ingredients...
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 