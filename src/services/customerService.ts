import api from "../api/api";
import { type Customer } from "../models/Customers";


export const getCustomers = async () => {
  const response = await api.get<Customer[]>("/customer");
  return response.data;
};

export const getCustomer = async (id: string) => {
  const response = await api.get<Customer>(`/customer/${id}`);
  return response.data;
};

export const createCustomer = async (
  customer: Customer
) => {
  const response = await api.post(
    "/customer",
    customer
  );

  return response.data;
};

export const deleteCustomer = async (
  id: string
) => {
  const response = await api.delete(
    `/customer/${id}`
  );

  return response.data;
};