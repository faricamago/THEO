import { Expense, Settlement } from '../types'

interface DashboardProps {
  expenses: Expense[]
  settlement: Settlement | null
  month: number
  year: number
}

export default function Dashboard({ expenses, settlement, month, year }: DashboardProps) {
  const youTotal = expenses
    .filter(e => e.person === 'You')
    .reduce((sum, e) => sum + e.amount, 0)

  const bfTotal = expenses
    .filter(e => e.person === 'Boyfriend')
    .reduce((sum, e) => sum + e.amount, 0)

  const monthName = new Date(year, month - 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">{monthName} Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-cream rounded-lg border border-soft-grey">
          <p className="text-sm text-dark-grey mb-2">Your Total</p>
          <p className="text-4xl font-bold text-charcoal">${youTotal.toFixed(2)}</p>
        </div>

        <div className="p-4 bg-cream rounded-lg border border-soft-grey">
          <p className="text-sm text-dark-grey mb-2">Boyfriend's Total</p>
          <p className="text-4xl font-bold text-charcoal">${bfTotal.toFixed(2)}</p>
        </div>
      </div>

      {settlement && (
        <div className="p-6 bg-soft-grey rounded-lg border-2 border-charcoal">
          <h3 className="text-xl font-bold mb-4">Settlement</h3>
          {settlement.whoOwes === 'Even' ? (
            <p className="text-green-600 font-semibold text-lg">✓ All even! 🎉</p>
          ) : (
            <div>
              <p className="text-lg">
                <span className="font-bold">{settlement.whoOwes}</span> owes
                <span className="font-bold text-charcoal ml-2">
                  ${settlement.amount.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
