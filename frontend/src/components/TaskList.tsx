import { useState } from 'react'
import axios from 'axios'
import { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
  onUpdate: () => void
}

export default function TaskList({ tasks, onUpdate }: TaskListProps) {
  const [updating, setUpdating] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleToggle = async (task: Task) => {
    setUpdating(task.id)
    try {
      await axios.patch(`/api/tasks/${task.id}`, {
        completed: !task.completed,
      })
      onUpdate()
    } catch {
      console.error('Failed to update task')
    } finally {
      setUpdating(null)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await axios.delete(`/api/tasks/${id}`)
      onUpdate()
    } catch {
      console.error('Failed to delete task')
    } finally {
      setDeleting(null)
    }
  }

  const incompleteTasks = tasks.filter(t => !t.completed)
  const completedTasks = tasks.filter(t => t.completed)

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-center text-dark-grey py-12">No tasks yet. Add one to get started!</p>
      ) : (
        <>
          {/* Incomplete Tasks */}
          {incompleteTasks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">To Do</h3>
              <div className="space-y-3">
                {incompleteTasks.map(task => (
                  <div
                    key={task.id}
                    className="card p-4 flex items-center gap-4"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggle(task)}
                      disabled={updating === task.id}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{task.description}</p>
                      <p className="text-sm text-dark-grey">
                        Assigned to: <span className="font-medium">{task.assignedTo}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(task.id)}
                      disabled={deleting === task.id}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition disabled:opacity-50"
                    >
                      {deleting === task.id ? '...' : '✕'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-dark-grey">Completed</h3>
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <div
                    key={task.id}
                    className="card p-4 flex items-center gap-4 opacity-60"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggle(task)}
                      disabled={updating === task.id}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="font-semibold line-through">{task.description}</p>
                      <p className="text-sm text-dark-grey">
                        Completed by: <span className="font-medium">{task.assignedTo}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(task.id)}
                      disabled={deleting === task.id}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition disabled:opacity-50"
                    >
                      {deleting === task.id ? '...' : '✕'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
