import { Expense, Settlement } from '../types'

interface DashboardProps {
  expenses: Expense[]
  settlement: Settlement | null
  month: number
  year: number
}

export default function Dashboard({ expenses, settlement, month, year }: DashboardProps) {
  const faricaTotal = expenses
    .filter(e => e.person === 'Farica')
    .reduce((sum, e) => sum + e.amount, 0)

  const yelyseiTotal = expenses
    .filter(e => e.person === 'Yelysei')
    .reduce((sum, e) => sum + e.amount, 0)

  const monthName = new Date(year, month - 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">{monthName} Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-pastel-pink to-white rounded-lg border-2 border-royal-pink">
          <p className="text-sm font-semibold text-royal-pink mb-2">Farica Total</p>
          <p className="text-4xl font-bold text-royal-pink">${faricaTotal.toFixed(2)}</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-royal-black to-dark-grey rounded-lg border-2 border-gold-accent">
          <p className="text-sm font-semibold text-gold-accent mb-2">Yelysei Total</p>
          <p className="text-4xl font-bold text-gold-accent">${yelyseiTotal.toFixed(2)}</p>
        </div>
      </div>

      {settlement && (
        <div className="p-6 bg-gradient-to-br from-cream via-soft-grey to-cream rounded-lg border-2 border-gold-accent/50">
          <h3 className="text-xl font-bold mb-4">Settlement</h3>
          {settlement.whoOwes === 'Even' ? (
            <p className="text-green-600 font-semibold text-lg">All settled!</p>
          ) : (
            <div>
              <p className="text-lg">
                <span className="font-bold">{settlement.whoOwes}</span> owes
                <span className="font-bold text-royal-black ml-2">
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
