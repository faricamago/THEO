import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { Task } from '../types'

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/tasks')
      setTasks(res.data)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-charcoal">Theo's Tasks</h1>

      <TaskForm onAdd={fetchTasks} />

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <TaskList tasks={tasks} onUpdate={fetchTasks} />
      )}
    </div>
  )
}
