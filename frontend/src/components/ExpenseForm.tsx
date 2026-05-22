import { useState } from 'react'
import axios from 'axios'

interface ExpenseFormProps {
  onAdd: () => void
  selectedMonth: number
  selectedYear: number
}

export default function ExpenseForm({ onAdd, selectedMonth, selectedYear }: ExpenseFormProps) {
  const [person, setPerson] = useState<'Farica' | 'Yelysei'>('Farica')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isCurrentMonth = () => {
    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear()
    return selectedMonth === currentMonth && selectedYear === currentYear
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isCurrentMonth()) {
      setError('You can only add expenses for the current month')
      return
    }

    if (!description || !amount) {
      setError('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      await axios.post('/api/expenses', {
        person,
        description,
        amount: parseFloat(amount),
        category,
      })
      setPerson('Farica')
      setDescription('')
      setAmount('')
      setCategory('Food')
      onAdd()
    } catch {
      setError('Failed to add expense')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card mb-6">
      <h3 className="text-xl font-bold mb-4">Add Expense</h3>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {!isCurrentMonth() && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
          You are viewing a past or future month. You can only add expenses for the current month.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Who?</label>
          <select
            value={person}
            onChange={(e) => setPerson(e.target.value as 'Farica' | 'Yelysei')}
            className="input-field"
            disabled={!isCurrentMonth()}
          >
            <option>Farica</option>
            <option>Yelysei</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
            disabled={!isCurrentMonth()}
          >
            <option>Food</option>
            <option>Vet</option>
            <option>Toys</option>
            <option>Supplies</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Cat food, grooming"
          className="input-field"
          disabled={!isCurrentMonth()}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Amount ($)</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="input-field"
          disabled={!isCurrentMonth()}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !isCurrentMonth()}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  )
}
