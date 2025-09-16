import type { Expense } from "../../types/expense"

const ExpenseTable = ({ items, onDelete }: { items: Expense[]; onDelete: (id: number) => void }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-blue-100">
      <table className="min-w-full divide-y divide-blue-100">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase">Category</th>
            <th className="px-6 py-3 text-center text-xs font-semibold text-blue-700 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase">Description</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-blue-700 uppercase w-20"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-50">
          {items.map((row) => (
            <tr key={row.id} className="hover:bg-blue-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700 text-left">{row.expense_date}</td>
              <td className="px-6 py-4 text-sm text-gray-700 text-left">{row.category_name}</td>
              <td className="px-6 py-4 text-sm text-gray-700 text-center">{Number(row.amount).toFixed(2)}</td>
              <td className="px-6 py-4 text-sm text-gray-700 text-left">{row.description || "-"}</td>
              <td className="px-6 py-4 text-sm text-right">
                <button
                  onClick={() => onDelete(row.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseTable
