
import { useEffect, useState } from "react";
import { getCategories, getExpenses, createExpense, deleteExpense } from "../services/api";
import type { Expense, Category } from "../types/expense";

export default function useExpenses() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", categoryId: "" });

  const loadCategories = async () => setCategories(await getCategories());
  const loadExpenses = async () => setExpenses(await getExpenses(filters));

  useEffect(() => { loadCategories(); }, []);
  useEffect(() => { loadExpenses(); }, [filters]);

  const refresh = () => loadExpenses();

  const onCreate = async (payload: Partial<Expense>) => {
    await createExpense(payload);
    refresh();
  };

  const onDelete = async (id: number) => {
    await deleteExpense(id);
    refresh();
  };

  return { categories, expenses, filters, setFilters, onCreate, onDelete, refresh };
}
