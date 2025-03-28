import { Link } from 'react-router-dom';
import { FavoriteMeal } from '@/types/meal';
import { useFavorites } from '@/hooks/useFavorites';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface FavoriteRecipeCardProps {
  meal: FavoriteMeal;
}

export function FavoriteRecipeCard({ meal }: FavoriteRecipeCardProps) {
  const { updateQuantity, removeFavorite } = useFavorites();

  const handleIncrement = () => {
    updateQuantity(meal.idMeal, meal.quantity + 1);
  };

  const handleDecrement = () => {
    if (meal.quantity > 1) {
      updateQuantity(meal.idMeal, meal.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFavorite(meal.idMeal);
  };

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <Link to={`/recipe/${meal.idMeal}`} className="md:w-1/4 flex-shrink-0">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 md:h-full object-cover"
        />
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/recipe/${meal.idMeal}`} className="hover:underline">
            <h3 className="font-bold text-lg">{meal.strMeal}</h3>
          </Link>
          <button
            onClick={handleRemove}
            className="text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Remove from favorites"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          <span>{meal.strCategory}</span>
          <span className="mx-2">•</span>
          <span>{meal.strArea}</span>
        </div>

        <div className="mt-auto flex items-center">
          <div className="flex items-center border border-input rounded-md overflow-hidden">
            <button
              onClick={handleDecrement}
              disabled={meal.quantity <= 1}
              className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-1 border-x border-input">
              {meal.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-2 hover:bg-muted transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
