import { Meal, Ingredient } from '@/types/meal';

export function useIngredients() {
  const convertToDecimal = (fraction: string): number => {
    const parts = fraction.split(' ');
    let result = 0;

    for (const part of parts) {
      if (part.includes('/')) {
        const [numerator, denominator] = part.split('/').map(Number);
        result += numerator / denominator;
      } else {
        result += Number(part);
      }
    }

    return result;
  };

  const formatFraction = (decimal: number): string => {
    if (Number.isInteger(decimal)) {
      return decimal.toString();
    }

    const precision = 0.01;
    const maxDenominator = 100;
    
    for (let denominator = 1; denominator <= maxDenominator; denominator++) {
      const numerator = Math.round(decimal * denominator);
      if (Math.abs(decimal - numerator / denominator) < precision) {
        return `${numerator}/${denominator}`;
      }
    }

    return decimal.toFixed(1);
  };

  const getIngredients = (meal: Meal, portions: number = 1): Ingredient[] => {
    const ingredients: Ingredient[] = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      const measure = meal[`strMeasure${i}` as keyof Meal];
      
      if (ingredient && ingredient.trim()) {
        const measureMatch = measure?.match(/^(\d+(?:\s+\d+\/\d+)?)\s*(.*)$/);
        if (measureMatch) {
          const [, amount, unit] = measureMatch;
          const decimalAmount = convertToDecimal(amount);
          const adjustedAmount = decimalAmount * portions;
          const formattedAmount = formatFraction(adjustedAmount);
          ingredients.push({
            name: ingredient,
            quantity: `${formattedAmount} ${unit}`,
          });
        } else {
          ingredients.push({
            name: ingredient,
            quantity: measure ? measure.trim() : 'to taste',
          });
        }
      }
    }

    return ingredients;
  };

  const combineIngredients = (meals: Meal[], portions: Record<string, number>): Ingredient[] => {
    const combinedIngredients = new Map<string, { amount: number; unit: string }>();

    meals.forEach((meal) => {
      const mealPortions = portions[meal.idMeal] || 1;
      const ingredients = getIngredients(meal, mealPortions);
      
      ingredients.forEach((ingredient) => {
        const existingIngredient = combinedIngredients.get(ingredient.name);
        if (existingIngredient) {
          if (existingIngredient.unit === ingredient.quantity.split(' ').slice(-1)[0]) {
            const [amount] = ingredient.quantity.split(' ');
            existingIngredient.amount += convertToDecimal(amount);
          } else {
            combinedIngredients.set(`${ingredient.name} (${ingredient.quantity.split(' ').slice(-1)[0]})`, {
              amount: convertToDecimal(ingredient.quantity.split(' ')[0]),
              unit: ingredient.quantity.split(' ').slice(-1)[0],
            });
          }
        } else {
          const [amount, ...unitParts] = ingredient.quantity.split(' ');
          combinedIngredients.set(ingredient.name, {
            amount: convertToDecimal(amount),
            unit: unitParts.join(' '),
          });
        }
      });
    });

    return Array.from(combinedIngredients.entries()).map(([name, { amount, unit }]) => ({
      name,
      quantity: `${formatFraction(amount)} ${unit}`,
    }));
  };

  return {
    getIngredients,
    combineIngredients,
  };
} 