import { Meal } from '@/types/meal';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart, YoutubeIcon } from 'lucide-react';
import { getIngredients } from '@/utils/mealUtils';

interface RecipeDetailProps {
  meal: Meal;
}

export function RecipeDetail({ meal }: RecipeDetailProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isInFavorites = isFavorite(meal.idMeal);
  const ingredients = getIngredients(meal);

  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-white text-3xl font-bold mb-2">{meal.strMeal}</h1>
          <div className="flex items-center text-white/90 gap-4">
            <span>{meal.strCategory}</span>
            <span>•</span>
            <span>{meal.strArea}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleFavoriteToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isInFavorites
                ? 'bg-red-100 text-red-600'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Heart className={isInFavorites ? 'fill-red-500' : ''} size={18} />
            {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <YoutubeIcon size={18} />
              Watch Video
            </a>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Ingredients</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>
                  <strong>{ingredient.name}</strong>
                  {ingredient.measure && ` - ${ingredient.measure}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <div className="prose max-w-none">
            {meal.strInstructions.split('\r\n\r\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {meal.strSource && (
          <div className="mt-6 text-sm text-muted-foreground">
            <span>Source: </span>
            <a
              href={meal.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {new URL(meal.strSource).hostname}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
