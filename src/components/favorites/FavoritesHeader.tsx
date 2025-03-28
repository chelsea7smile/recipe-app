import { Trash2 } from 'lucide-react';

interface FavoritesHeaderProps {
  onClearFavorites: () => void;
}

export function FavoritesHeader({ onClearFavorites }: FavoritesHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Favorite Recipes</h1>
      <button
        onClick={onClearFavorites}
        className="flex items-center gap-2 px-4 py-2 text-destructive hover:text-destructive/90 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
        Clear All
      </button>
    </div>
  );
} 