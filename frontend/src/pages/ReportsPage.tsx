import { useState, useEffect } from 'react'
import { fetchExpensesByMonth } from '../supabaseClient'
import { generatePDFReport } from '../pdfGenerator'
import type { Expense } from '../supabaseClient'

export default function ReportsPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDownloadPDF = async () => {
    setLoading(true)
    setError('')
    try {
      const expenses = await fetchExpensesByMonth(month, year)
      generatePDFReport(expenses, month, year)
    } catch (err) {
      console.error('Failed to generate PDF:', err)
      setError('Failed to generate report. Please check your Supabase connection.')
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

  const monthName = new Date(year, month - 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-charcoal">Monthly Reports</h1>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-6">Generate PDF Report</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Month</label>
            <select
              value={month}
              onChange={handleMonthChange}
              className="input-field"
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
              className="input-field"
            />
          </div>
        </div>

        <div className="p-4 bg-cream rounded-lg mb-8 border border-soft-grey">
          <p className="text-sm text-dark-grey mb-2">Selected Period</p>
          <p className="text-2xl font-bold">{monthName}</p>
        </div>

        <button
          onClick={handleDownloadPDF}
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Download PDF Report'}
        </button>
      </div>

      <div className="card p-8 bg-soft-grey">
        <h3 className="text-lg font-bold mb-4">Report Contents</h3>
        <ul className="space-y-2 text-dark-grey">
          <li>✓ Monthly expense breakdown by person</li>
          <li>✓ Category-wise expense details</li>
          <li>✓ Total amounts for Farica and Yelysei</li>
          <li>✓ Settlement calculation and who owes whom</li>
          <li>✓ Professional formatting for sharing</li>
        </ul>
      </div>
    </div>
  )
}
