import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/expenses", label: "Expenses" },
  ]

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Expense Tracker</span>
          </h1>

          {/* Links */}
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full"
                    : "text-indigo-100 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
