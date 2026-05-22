import { useState, useEffect } from 'react'
import ExpensesPage from './pages/ExpensesPage'
import ReportsPage from './pages/ReportsPage'

type Page = 'expenses' | 'reports'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('expenses')

  return (
    <div className="min-h-screen">
      <nav className="navbar bg-gradient-to-r from-royal-black to-dark-grey text-white">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-wide">Theo</h1>
            <div className="flex gap-8">
              <button
                onClick={() => setCurrentPage('expenses')}
                className={`py-2 px-4 transition font-semibold ${
                  currentPage === 'expenses'
                    ? 'border-b-3 border-gold-accent text-gold-accent'
                    : 'hover:text-gold-accent'
                }`}
              >
                Expenses
              </button>
              <button
                onClick={() => setCurrentPage('reports')}
                className={`py-2 px-4 transition font-semibold ${
                  currentPage === 'reports'
                    ? 'border-b-3 border-gold-accent text-gold-accent'
                    : 'hover:text-gold-accent'
                }`}
              >
                Reports
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {currentPage === 'expenses' && <ExpensesPage />}
        {currentPage === 'reports' && <ReportsPage />}
      </main>
    </div>
  )
}
