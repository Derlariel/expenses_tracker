import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">💸 Expense Tracker</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/expenses" className="hover:underline">Expenses</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
