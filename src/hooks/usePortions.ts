import { useState } from 'react';

export function usePortions(initialPortions: Record<string, number> = {}) {
  const [portions, setPortions] = useState<Record<string, number>>(initialPortions);

  const handlePortionChange = (mealId: string, increment: boolean) => {
    setPortions((prev) => {
      const currentPortions = prev[mealId] || 1;
      const newPortions = increment ? currentPortions + 1 : Math.max(1, currentPortions - 1);
      return {
        ...prev,
        [mealId]: newPortions,
      };
    });
  };

  const setPortionsForMeal = (mealId: string, portions: number) => {
    setPortions((prev) => ({
      ...prev,
      [mealId]: Math.max(1, portions),
    }));
  };

  const getPortionsForMeal = (mealId: string) => portions[mealId] || 1;

  return {
    portions,
    handlePortionChange,
    setPortionsForMeal,
    getPortionsForMeal,
  };
} 