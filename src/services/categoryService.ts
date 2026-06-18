import api from "../api/api";
import { type Category } from "../models/Category";

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories/");
  return response.data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await api.get<Category>(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const response = await api.post("/categories", category);
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};