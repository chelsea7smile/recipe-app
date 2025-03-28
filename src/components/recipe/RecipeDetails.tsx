import { useState } from 'react';
import { motion } from 'framer-motion';
import { Meal } from '@/types/meal';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart, Plus, Minus } from 'lucide-react';

interface RecipeDetailsProps {
  meal: Meal;
  portions?: number;
  onPortionChange?: (portions: number) => void;
}

export function RecipeDetails({ meal, portions = 1, onPortionChange }: RecipeDetailsProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handlePortionChange = (increment: boolean) => {
    if (!onPortionChange) return;
    const newPortions = increment ? portions + 1 : Math.max(1, portions - 1);
    onPortionChange(newPortions);
  };

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      const measure = meal[`strMeasure${i}` as keyof Meal];
      if (ingredient && ingredient.trim()) {
        const measureMatch = measure?.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
        if (measureMatch) {
          const [, amount, unit] = measureMatch;
          const numericAmount = parseFloat(amount);
          const adjustedAmount = (numericAmount * portions).toFixed(1);
          ingredients.push({
            ingredient,
            measure: `${adjustedAmount} ${unit}`,
          });
        } else {
          ingredients.push({
            ingredient,
            measure: measure ? measure.trim() : 'to taste',
          });
        }
      }
    }
    return ingredients;
  };

  const getInstructions = () => {
    return meal.strInstructions.split('\n').filter((step) => step.trim());
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
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
        <button
          onClick={() => toggleFavorite(meal)}
          className="absolute top-4 right-4 p-3 rounded-full bg-white hover:bg-white/90 transition-colors"
        >
          <Heart
            className={`w-7 h-7 ${
              isFavorite(meal.idMeal)
                ? 'fill-red-500 text-red-500'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-1.5 text-base text-muted-foreground border border-muted rounded-full">
              {meal.strCategory}
            </span>
            <span className="px-4 py-1.5 text-base text-muted-foreground border border-muted rounded-full">
              {meal.strArea}
            </span>
          </div>
        </div>

        {onPortionChange && (
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Portions:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePortionChange(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-8 text-center text-lg">{portions}</span>
              <button
                onClick={() => handlePortionChange(true)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getIngredients().map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
              >
                <span className="font-medium">{item.ingredient}:</span>
                <span className="text-muted-foreground">
                  {item.measure ? item.measure : 'to taste'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {getInstructions().map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {meal.strYoutube && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Video Recipe</h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={meal.strYoutube.replace('watch?v=', 'embed/')}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
} 