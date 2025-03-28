export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

export interface MealBasic {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface FavoriteMeal extends Meal {
  quantity: number;
}

export interface MealCategory {
  strCategory: string;
}

export interface RawMealData {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string;
  strImageSource: string | null;
  dateModified: string | null;
  [key: string]: string | null;
}

export interface MealApiResponse {
  meals: RawMealData[] | null;
}

export interface CategoryApiResponse {
  categories: {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }[];
}

export const mapToMeal = (rawMeal: RawMealData): Meal => {
  const ingredients = extractIngredients(rawMeal);
  
  return {
    idMeal: rawMeal.idMeal,
    strMeal: rawMeal.strMeal,
    strDrinkAlternate: null,
    strCategory: rawMeal.strCategory,
    strArea: rawMeal.strArea,
    strInstructions: rawMeal.strInstructions,
    strMealThumb: rawMeal.strMealThumb,
    strTags: rawMeal.strTags,
    strYoutube: rawMeal.strYoutube,
    strSource: rawMeal.strSource,
    strImageSource: rawMeal.strImageSource,
    dateModified: rawMeal.dateModified,
    strCreativeCommonsConfirmed: null,
    strIngredient1: ingredients[0]?.name || '',
    strIngredient2: ingredients[1]?.name || '',
    strIngredient3: ingredients[2]?.name || '',
    strIngredient4: ingredients[3]?.name || '',
    strIngredient5: ingredients[4]?.name || '',
    strIngredient6: ingredients[5]?.name || '',
    strIngredient7: ingredients[6]?.name || '',
    strIngredient8: ingredients[7]?.name || '',
    strIngredient9: ingredients[8]?.name || '',
    strIngredient10: ingredients[9]?.name || '',
    strIngredient11: ingredients[10]?.name || '',
    strIngredient12: ingredients[11]?.name || '',
    strIngredient13: ingredients[12]?.name || '',
    strIngredient14: ingredients[13]?.name || '',
    strIngredient15: ingredients[14]?.name || '',
    strIngredient16: ingredients[15]?.name || '',
    strIngredient17: ingredients[16]?.name || '',
    strIngredient18: ingredients[17]?.name || '',
    strIngredient19: ingredients[18]?.name || '',
    strIngredient20: ingredients[19]?.name || '',
    strMeasure1: ingredients[0]?.quantity || '',
    strMeasure2: ingredients[1]?.quantity || '',
    strMeasure3: ingredients[2]?.quantity || '',
    strMeasure4: ingredients[3]?.quantity || '',
    strMeasure5: ingredients[4]?.quantity || '',
    strMeasure6: ingredients[5]?.quantity || '',
    strMeasure7: ingredients[6]?.quantity || '',
    strMeasure8: ingredients[7]?.quantity || '',
    strMeasure9: ingredients[8]?.quantity || '',
    strMeasure10: ingredients[9]?.quantity || '',
    strMeasure11: ingredients[10]?.quantity || '',
    strMeasure12: ingredients[11]?.quantity || '',
    strMeasure13: ingredients[12]?.quantity || '',
    strMeasure14: ingredients[13]?.quantity || '',
    strMeasure15: ingredients[14]?.quantity || '',
    strMeasure16: ingredients[15]?.quantity || '',
    strMeasure17: ingredients[16]?.quantity || '',
    strMeasure18: ingredients[17]?.quantity || '',
    strMeasure19: ingredients[18]?.quantity || '',
    strMeasure20: ingredients[19]?.quantity || '',
  };
};

export const extractIngredients = (mealData: RawMealData): Ingredient[] => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient,
        quantity: measure || '',
      });
    }
  }

  return ingredients;
};

export function getMealIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
    const measure = meal[`strMeasure${i}` as keyof Meal] as string;

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient,
        quantity: measure,
      });
    }
  }

  return ingredients;
}
