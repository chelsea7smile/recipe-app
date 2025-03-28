import { useParams, useNavigate } from 'react-router-dom';
import { useMealById } from '@/hooks/useMeals';
import { RecipeDetail } from '@/components/recipe/RecipeDetail';
import { ArrowLeft } from 'lucide-react';

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: meal, isLoading, isError } = useMealById(id || '');

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-muted rounded-lg mb-6"></div>
        <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
        <div className="h-4 bg-muted rounded mb-2"></div>
        <div className="h-4 bg-muted rounded mb-2"></div>
        <div className="h-4 bg-muted rounded mb-2"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
    );
  }

  if (isError || !meal) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-destructive mb-4">
          Recipe Not Found
        </h2>
        <p className="mb-6">
          The recipe you're looking for doesn't exist or couldn't be loaded.
        </p>
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mx-auto"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={18} />
        Back to recipes
      </button>

      <RecipeDetail meal={meal} />
    </div>
  );
}
