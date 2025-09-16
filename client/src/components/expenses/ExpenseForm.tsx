import { useState } from "react"
import type { Category } from "../../types/expense"

const ExpenseForm = ({ categories, onCreate }: { categories: Category[]; onCreate: (p: any) => void }) => {
  const [state, setState] = useState({
    amount: "",
    description: "",
    category_id: "",
    expense_date: new Date().toISOString().slice(0, 10),
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!state.amount || !state.category_id) return alert("Amount & category required")
    onCreate({
      amount: Number(state.amount),
      description: state.description || null,
      category_id: Number(state.category_id),
      expense_date: state.expense_date,
    })
    setState((s) => ({ ...s, amount: "", description: "" }))
  }

  return (
   <form onSubmit={submit} className="bg-white shadow-md rounded-xl p-6 space-y-5 border border-blue-100">
  <div>
    <label className="block text-blue-700 text-sm font-semibold mb-2">Amount</label>
    <input
      type="number"
      step="0.01"
      value={state.amount}
      onChange={(e) => setState(s => ({ ...s, amount: e.target.value }))}
      required
      className="shadow border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
    />
  </div>

  <div>
    <label className="block text-blue-700 text-sm font-semibold mb-2">Description</label>
    <input
      value={state.description}
      onChange={(e) => setState(s => ({ ...s, description: e.target.value }))}
      placeholder="(optional)"
      className="shadow border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
    />
  </div>

  <div>
    <label className="block text-blue-700 text-sm font-semibold mb-2">Category</label>
    <select
      value={state.category_id}
      onChange={(e) => setState(s => ({ ...s, category_id: e.target.value }))}
      required
      className="shadow border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
    >
      <option value="">Select...</option>
      {categories.map(c => (
        <option key={c.id} value={c.id}>{c.name}</option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-blue-700 text-sm font-semibold mb-2">Date</label>
    <input
      type="date"
      value={state.expense_date}
      onChange={(e) => setState(s => ({ ...s, expense_date: e.target.value }))}
      className="shadow border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
  >
    Add Expense
  </button>
</form>

  )
}

export default ExpenseForm
