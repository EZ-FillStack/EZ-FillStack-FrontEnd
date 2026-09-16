import clientAPI from '@/lib/axios';
import type { Category } from '@/types/category';

export async function getCategories() {
  const response = await clientAPI.get<Category[]>('/categories');
  return response.data;
}

export async function getCategoryById(categoryId: number) {
  const response = await clientAPI.get<Category>(`/categories/${categoryId}`);
  return response.data;
}
