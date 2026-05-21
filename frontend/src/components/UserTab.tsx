import { useState } from 'react'
import axios from 'axios'

interface Expense {
  id: string
  date: string
  person: 'You' | 'Boyfriend'
  description: string
  amount: number
  category: string
}

interface UserTabProps {
  expenses: Expense[]
  person: 'You' | 'Boyfriend'
  onDelete: () => void
}

export default function UserTab({ expenses, person, onDelete }: UserTabProps) {
  const [deleting, setDeleting] = useState<string | null>(null)

  const userExpenses = expenses.filter(e => e.person === person)
  const total = userExpenses.reduce((sum, e) => sum + e.amount, 0)

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await axios.delete(`/api/expenses/${id}`)
      onDelete()
    } catch (error) {
      console.error('Failed to delete:', error)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div>
      <div className="mb-6 p-4 bg-soft-grey rounded-lg">
        <p className="text-sm text-dark-grey">Total Expenses</p>
        <p className="text-3xl font-bold">${total.toFixed(2)}</p>
      </div>

      {userExpenses.length === 0 ? (
        <p className="text-dark-grey text-center py-8">No expenses yet</p>
      ) : (
        <div className="space-y-3">
          {userExpenses.map(expense => (
            <div
              key={expense.id}
              className="card flex items-center justify-between p-4"
            >
              <div>
                <p className="font-semibold">{expense.description}</p>
                <p className="text-sm text-dark-grey">
                  {expense.category} • {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-2xl font-bold text-charcoal">${expense.amount.toFixed(2)}</p>
                <button
                  onClick={() => handleDelete(expense.id)}
                  disabled={deleting === expense.id}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition disabled:opacity-50"
                >
                  {deleting === expense.id ? '...' : '✕'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
