import { useState, useMemo } from 'react';
import { Meal } from '@/types/meal';

interface UseFilterProps {
  items: Meal[];
  initialCategory?: string | null;
}

interface UseFilterReturn {
  filteredItems: Meal[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[];
}

export function useFilter({ items, initialCategory = null }: UseFilterProps): UseFilterReturn {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(items.map(item => item.strCategory));
    return Array.from(uniqueCategories).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!selectedCategory) {
      return items;
    }
    return items.filter(item => item.strCategory === selectedCategory);
  }, [items, selectedCategory]);

  return {
    filteredItems,
    selectedCategory,
    setSelectedCategory,
    categories,
  };
} 