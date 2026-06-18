import api from "../api/api";
import { type CategoryOfEvent } from "../models/CategoryOfEvent";

export const getAllCategoryOfEvents = async (): Promise<CategoryOfEvent[]> => {
  const response = await api.get<CategoryOfEvent[]>("/category-of-event");
  return response.data;
};

export const getCategoryOfEventById = async (id: number): Promise<CategoryOfEvent> => {
  const response = await api.get<CategoryOfEvent>(`/category-of-event/${id}`);
  return response.data;
};

export const createCategoryOfEvent = async (item: CategoryOfEvent): Promise<CategoryOfEvent> => {
  const response = await api.post("/category-of-event", item);
  return response.data;
};

export const deleteCategoryOfEvent = async (id: number): Promise<void> => {
  await api.delete(`/category-of-event/${id}`);
};