import { useState, useEffect } from 'react'
import axios from 'axios'
import ExpenseForm from '../components/ExpenseForm'
import UserTab from '../components/UserTab'
import Dashboard from '../components/Dashboard'
import { Expense, Settlement } from '../types'

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [settlement, setSettlement] = useState<Settlement | null>(null)
  const [activeTab, setActiveTab] = useState<'you' | 'bf' | 'summary'>('summary')
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExpenses()
  }, [month, year])

  const fetchExpenses = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/api/expenses/month/${month}/${year}`)
      setExpenses(res.data)

      const settleRes = await axios.get(`/api/expenses/settlement/${month}/${year}`)
      setSettlement(settleRes.data)
    } catch (error) {
      console.error('Failed to fetch expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value))
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.target.value))
  }

  return (
    <div>
      {/* Month/Year Selector */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Month</label>
            <select
              value={month}
              onChange={handleMonthChange}
              className="input-field w-40"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2024, i).toLocaleDateString('en-US', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <input
              type="number"
              value={year}
              onChange={handleYearChange}
              className="input-field w-32"
            />
          </div>
        </div>
      </div>

      <ExpenseForm onAdd={fetchExpenses} />

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex gap-6 mb-6 border-b border-soft-grey">
            <button
              onClick={() => setActiveTab('summary')}
              className={`pb-3 font-semibold ${
                activeTab === 'summary' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('you')}
              className={`pb-3 font-semibold ${
                activeTab === 'you' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              Your Expenses
            </button>
            <button
              onClick={() => setActiveTab('bf')}
              className={`pb-3 font-semibold ${
                activeTab === 'bf' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              Boyfriend's Expenses
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'summary' && (
            <Dashboard expenses={expenses} settlement={settlement} month={month} year={year} />
          )}
          {activeTab === 'you' && (
            <UserTab expenses={expenses} person="You" onDelete={fetchExpenses} />
          )}
          {activeTab === 'bf' && (
            <UserTab expenses={expenses} person="Boyfriend" onDelete={fetchExpenses} />
          )}
        </>
      )}
    </div>
  )
}
