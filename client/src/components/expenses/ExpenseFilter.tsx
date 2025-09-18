import type { Category } from "../../types/expense"

interface FilterProps {
  categories: Category[]
  filters: { startDate: string; endDate: string; categoryId: string; sort: string; order: string }
  onFilterChange: (filters: any) => void
  onRefresh: () => void
}

const ExpenseFilter = ({ categories, filters, onFilterChange, onRefresh }: FilterProps) => {
  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
      <div className="flex flex-wrap gap-6 items-end">
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-1">Start Date</label>
          <input
            type="date"
            value={filters.startDate || ""}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="rounded-lg border-gray-300 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-1">End Date</label>
          <input
            type="date"
            value={filters.endDate || ""}
            onChange={(e) => handleChange("endDate", e.target.value)}
            className="rounded-lg border-gray-300 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-1">Category</label>
          <select
            value={filters.categoryId || ""}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            className="rounded-lg border-gray-300 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-1">Sort By</label>
          <select
            value={filters.sort || "expense_date"}
            onChange={(e) => handleChange("sort", e.target.value)}
            className="rounded-lg border-gray-300 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="expense_date">Date</option>
            <option value="amount">Amount</option>
            <option value="created_at">Created At</option>
          </select>
        </div>

        <div>
          <label className="bl ock text-sm font-semibold text-gray-500 mb-1">Order</label>
          <select
            value={filters.order || "desc"}
            onChange={(e) => handleChange("order", e.target.value)}
            className="rounded-lg border-gray-300 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <button
          onClick={onRefresh}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Refresh
        </button>
      </div>
    </div>
  )
}

export default ExpenseFilter
