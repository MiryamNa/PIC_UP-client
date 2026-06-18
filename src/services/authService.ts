import api from "../api/api"
import type { Customer } from "../models/Customers"

export type RegisterCustomerRequest = Customer
export type LoginCustomerRequest = {
  firstName: string
  password: string
}

export const registerCustomer = async (
  customer: RegisterCustomerRequest
): Promise<Customer> => {
  const response = await api.post<Customer>("/customer", customer)
  return response.data
}

export const loginCustomer = async (
  payload: LoginCustomerRequest
): Promise<Customer> => {
  const response = await api.post<Customer>("/customer/login", payload)
  return response.data
}