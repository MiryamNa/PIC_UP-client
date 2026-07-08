import api from "../api/api";
import type { EventCreationDTO } from "../dto/EventCreation";
import { type Event } from "../models/Event";
import type { face_selectedDTO } from "../models/face_selectedDTO";

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>("/event");
  return response.data;
};

export const getEventById = async (id: string): Promise<Event> => {
  const response = await api.get<Event>(`/event/${id}`);
  return response.data;
};

export const createEvent = async (event: EventCreationDTO): Promise<Event> => {
  const response = await api.post("/event/", event);
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/event/${id}`);
};

export const processFaces=async (data: face_selectedDTO): Promise<void> => {
  await api.post(`/event/process-selection`, data);
}

export const countImages = async (folderPath: string): Promise<number> => {
  const response = await api.post<{ image_count: number }>("event/count-images", { path: folderPath });
  return response.data.image_count;
};

// TODO: replace with real backend endpoint when available
// expected: POST /event/get-images  body: { path: folderPath }  response: string[] (filenames)
export const getEventImages = async (_folderPath: string): Promise<string[]> => {
  return [];
};

