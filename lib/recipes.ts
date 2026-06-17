import type { Recipe, RecipesResponse } from "../types/recipe";

const BASE_URL = "https://dummyjson.com/recipes";
const DEFAULT_REVALIDATE = 3600;

export async function getRecipes(
  options: { limit?: number; skip?: number } = {},
): Promise<RecipesResponse> {
  const { limit = 30, skip = 0 } = options;

  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recipes (status ${res.status})`);
  }

  return res.json();
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const first = await getRecipes({ limit: 50, skip: 0 });

  if (first.recipes.length >= first.total) {
    return first.recipes;
  }

  const remaining = await getRecipes({
    limit: first.total - first.recipes.length,
    skip: first.recipes.length,
  });

  return [...first.recipes, ...remaining.recipes];
}

export async function getRecipeById(
  id: string | number,
): Promise<Recipe | null> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to fetch recipe ${id} (status ${res.status})`);
  }

  return res.json();
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  if (!query.trim()) return [];

  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to search recipes (status ${res.status})`);
  }

  const data: RecipesResponse = await res.json();
  return data.recipes;
}

export async function getRecipesByMealType(
  mealType: string,
): Promise<Recipe[]> {
  const res = await fetch(
    `${BASE_URL}/meal-type/${encodeURIComponent(mealType.toLowerCase())}`,
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch meal type ${mealType} (status ${res.status})`,
    );
  }

  const data: RecipesResponse = await res.json();
  return data.recipes;
}

export function getCuisines(recipes: Recipe[]): string[] {
  const cuisines = new Set(recipes.map((r) => r.cuisine));
  return Array.from(cuisines).sort();
}
