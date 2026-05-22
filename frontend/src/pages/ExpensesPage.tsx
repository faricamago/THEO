import { useState, useEffect } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import UserTab from '../components/UserTab'
import Dashboard from '../components/Dashboard'
import { Expense, Settlement } from '../types'
import { fetchExpensesByMonth, calculateSettlement } from '../supabaseClient'

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [settlement, setSettlement] = useState<Settlement | null>(null)
  const [activeTab, setActiveTab] = useState<'farica' | 'yelysei' | 'summary'>('summary')
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchExpenses()
  }, [month, year])

  const fetchExpenses = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchExpensesByMonth(month, year)
      setExpenses(data)

      const settlementData = await calculateSettlement(month, year)
      setSettlement(settlementData)
    } catch (err) {
      console.error('Failed to fetch expenses:', err)
      setError('Failed to load expenses. Please check your Supabase connection.')
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
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
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

      <ExpenseForm onAdd={fetchExpenses} selectedMonth={month} selectedYear={year} />

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <>
          <div className="flex gap-6 mb-6 border-b-2 border-soft-grey">
            <button
              onClick={() => setActiveTab('summary')}
              className={`pb-3 font-semibold ${
                activeTab === 'summary' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('farica')}
              className={`pb-3 font-semibold transition ${
                activeTab === 'farica'
                  ? 'text-royal-pink border-b-2 border-royal-pink'
                  : 'text-dark-grey hover:text-royal-pink'
              }`}
            >
              Farica Expenses
            </button>
            <button
              onClick={() => setActiveTab('yelysei')}
              className={`pb-3 font-semibold transition ${
                activeTab === 'yelysei'
                  ? 'text-charcoal border-b-2 border-charcoal'
                  : 'text-dark-grey hover:text-charcoal'
              }`}
            >
              Yelysei Expenses
            </button>
          </div>

          {activeTab === 'summary' && (
            <Dashboard expenses={expenses} settlement={settlement} month={month} year={year} />
          )}
          {activeTab === 'farica' && (
            <UserTab expenses={expenses} person="Farica" onDelete={fetchExpenses} />
          )}
          {activeTab === 'yelysei' && (
            <UserTab expenses={expenses} person="Yelysei" onDelete={fetchExpenses} />
          )}
        </>
      )}
    </div>
  )
}
