import Card from "../components/layout/Card";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseFilter from "../components/expenses/ExpenseFilter";
import ExpenseTable from "../components/expenses/ExpenseTable";
import useExpenses from "../hook/useExpenses";

const ExpensesPage = () => {
  const {
    categories,
    expenses,
    onCreate,
    onDelete,
    filters,
    setFilters,
    refresh,
  } = useExpenses();

  return (
    <div className="space-y-6">
      <Card title="➕ Add Expense">
        <ExpenseForm categories={categories} onCreate={onCreate} />
      </Card>
      <Card title="🔍 Filters">
        <ExpenseFilter
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
          onRefresh={refresh}
        />
      </Card>
      <Card title="📋 Expense Records">
        <ExpenseTable items={expenses} onDelete={onDelete} />
      </Card>
    </div>
  );
};

export default ExpensesPage;
