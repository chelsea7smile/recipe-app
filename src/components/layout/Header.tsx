import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import { FavoriteMeal } from '@/types/meal';

export function Header() {
  const { favorites } = useFavorites();
  const totalItems = favorites.reduce((sum: number, item: FavoriteMeal) => sum + item.quantity, 0);

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Recipe App
        </Link>

        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="hover:underline flex items-center gap-2"
              >
                Favorites
                {totalItems > 0 && (
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-base font-medium border-2 border-secondary-foreground/20">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
