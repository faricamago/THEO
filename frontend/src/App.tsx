import { useState, useEffect } from 'react'
import ExpensesPage from './pages/ExpensesPage'
import TasksPage from './pages/TasksPage'
import ReportsPage from './pages/ReportsPage'

type Page = 'expenses' | 'tasks' | 'reports'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('expenses')
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health')
        setIsOnline(res.ok)
      } catch {
        setIsOnline(false)
      }
    }
    checkHealth()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-charcoal text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">🐾 Theo</h1>
            <div className="flex gap-6">
              <button
                onClick={() => setCurrentPage('expenses')}
                className={`py-2 px-4 transition ${
                  currentPage === 'expenses'
                    ? 'border-b-2 border-cream'
                    : 'hover:text-cream'
                }`}
              >
                Expenses
              </button>
              <button
                onClick={() => setCurrentPage('tasks')}
                className={`py-2 px-4 transition ${
                  currentPage === 'tasks'
                    ? 'border-b-2 border-cream'
                    : 'hover:text-cream'
                }`}
              >
                Tasks
              </button>
              <button
                onClick={() => setCurrentPage('reports')}
                className={`py-2 px-4 transition ${
                  currentPage === 'reports'
                    ? 'border-b-2 border-cream'
                    : 'hover:text-cream'
                }`}
              >
                Reports
              </button>
            </div>
          </div>
          {!isOnline && (
            <p className="text-red-300 text-sm mt-2">⚠️ Backend not available</p>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {currentPage === 'expenses' && <ExpensesPage />}
        {currentPage === 'tasks' && <TasksPage />}
        {currentPage === 'reports' && <ReportsPage />}
      </main>
    </div>
  )
}
