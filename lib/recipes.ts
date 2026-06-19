import type { Recipe, RecipesResponse } from "../types/recipe";

const BASE_URL = "http://localhost:3001/recipes";
const DEFAULT_REVALIDATE = 3600;

export async function getRecipes(
  options: { limit?: number; skip?: number } = {},
): Promise<RecipesResponse> {
  const { limit = 35, skip = 0 } = options;

  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recipes (${res.status})`);
  }

  return res.json();
}

export async function getAllRecipes(): Promise<Recipe[]> {
  // Ask for the smallest page first just to read the real `total`,
  // then fetch everything in one shot. A hardcoded limit silently
  // drops anything added via /recipes/import or /recipes/egyptian.
  const first = await getRecipes({ limit: 35, skip: 0 });

  if (!first?.recipes) {
    console.error("Unexpected response:", first);
    return [];
  }

  if (first.total <= first.recipes.length) {
    return first.recipes;
  }

  const all = await getRecipes({ limit: first.total, skip: 0 });
  return all.recipes;
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

  // /recipes/search returns a plain Recipe[], not a paginated object.
  return res.json();
}

export async function getRecipesByMealType(
  mealType: string,
): Promise<Recipe[]> {
  // Matches the backend's actual route: GET /recipes/meal/search?meal=...
  const res = await fetch(
    `${BASE_URL}/meal/search?meal=${encodeURIComponent(mealType)}`,
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch meal type ${mealType} (status ${res.status})`,
    );
  }

  // Also a plain array, same as searchRecipes.
  return res.json();
}

export function getCuisines(recipes: Recipe[]): string[] {
  const cuisines = new Set(recipes.map((r) => r.cuisine));
  return Array.from(cuisines).sort();
}
