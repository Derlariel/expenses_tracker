import { useEffect, useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell as BarCell,
} from "recharts"
import { api } from "../../services/api"

const Dashboard = () => {
  const [data, setData] = useState({
    total: 0,
    byCategory: {} as Record<string, number>,
    byMonth: {} as Record<string, number>,
  })

  useEffect(() => {
    api.get("/api/summary").then(({ data }) => setData(data))
  }, [])

  const catData = Object.entries(data.byCategory).map(([k, v]) => ({ name: k, value: v }))
  const monthData = Object.entries(data.byMonth).map(([k, v]) => ({ month: k, value: v }))

  // ฟังก์ชันแปลง string เป็นสี (คงที่เสมอ)
  const stringToColor = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue = Math.abs(hash) % 360
    return `hsl(${hue}, 70%, 60%)`
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-lg font-semibold text-black">💰 Total Expenses</h3>
        <p className="text-3xl font-bold text-gray-500 mt-3">
          {data.total.toFixed ? data.total.toFixed(2) : data.total} ฿
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Category Distribution</h3>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={catData} dataKey="value" nameKey="name" outerRadius={90} label>
                  {catData.map((entry, idx) => (
                    <Cell key={idx} fill={stringToColor(entry.name)} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Monthly Trend</h3>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <BarChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8,8,0,0]}>
                  {monthData.map((entry, idx) => (
                    <BarCell key={idx} fill={stringToColor(entry.month)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
