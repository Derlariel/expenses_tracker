export type Expense = {
  id: number;
  amount: number;
  description?: string;
  category_id: number;
  category_name?: string;
  expense_date: string;
};

export type Category = {
  id: number;
  name: string;
};
