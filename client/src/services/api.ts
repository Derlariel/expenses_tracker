import axios from "axios"
import type { Expense, Category } from "../types/expense"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
})

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get("/api/categories")
  return data
}

export async function getExpenses(filters: any): Promise<Expense[]> {
  const { data } = await api.get("/api/expenses", { params: filters })
  return data
}

export async function createExpense(payload: Partial<Expense>) {
  await api.post("/api/expenses", payload)
}

export async function deleteExpense(id: number) {
  await api.delete(`/api/expenses/${id}`)
}
