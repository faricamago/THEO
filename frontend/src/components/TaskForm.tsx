import { useState } from 'react'
import axios from 'axios'

interface TaskFormProps {
  onAdd: () => void
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [description, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState<'You' | 'Boyfriend' | 'Both'>('Both')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!description) {
      setError('Please enter a task description')
      return
    }

    setLoading(true)
    try {
      await axios.post('/api/tasks', {
        description,
        assignedTo,
      })
      setDescription('')
      setAssignedTo('Both')
      onAdd()
    } catch {
      setError('Failed to add task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card mb-8">
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Task</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Feed Theo at 6pm"
          className="input-field"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Assign to</label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value as 'You' | 'Boyfriend' | 'Both')}
          className="input-field"
        >
          <option>You</option>
          <option>Boyfriend</option>
          <option>Both</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}
