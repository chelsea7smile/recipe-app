import { Ingredient } from '@/types/meal';

interface IngredientsListProps {
  ingredients: Ingredient[];
  title: string;
}

export function IngredientsList({ ingredients, title }: IngredientsListProps) {
  if (ingredients.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground">No ingredients to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-2">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.name}
            className="flex justify-between items-center py-2 border-b last:border-0"
          >
            <span className="font-medium">{ingredient.name}</span>
            <span className="text-muted-foreground">{ingredient.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
