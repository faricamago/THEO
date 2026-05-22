import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Expense types
export interface Expense {
  id: string
  date: string
  person: 'Farica' | 'Yelysei'
  description: string
  amount: number
  category: string
}

// Fetch expenses for a specific month/year
export const fetchExpensesByMonth = async (month: number, year: number): Promise<Expense[]> => {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = new Date(year, month, 0).toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false })

  if (error) throw error
  return (data || []) as Expense[]
}

// Add a new expense
export const addExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([expense])
    .select()
    .single()

  if (error) throw error
  return data as Expense
}

// Delete an expense
export const deleteExpense = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Calculate settlement for a month
export const calculateSettlement = async (month: number, year: number) => {
  const expenses = await fetchExpensesByMonth(month, year)

  const faricaTotal = expenses
    .filter(e => e.person === 'Farica')
    .reduce((sum, e) => sum + e.amount, 0)

  const yelyseiTotal = expenses
    .filter(e => e.person === 'Yelysei')
    .reduce((sum, e) => sum + e.amount, 0)

  const difference = Math.abs(faricaTotal - yelyseiTotal)
  const settlement = difference / 2

  let whoOwes = 'Even'
  if (faricaTotal > yelyseiTotal) {
    whoOwes = 'Yelysei'
  } else if (yelyseiTotal > faricaTotal) {
    whoOwes = 'Farica'
  }

  return {
    youTotal: faricaTotal,
    boyfriendTotal: yelyseiTotal,
    difference,
    whoOwes,
    amount: settlement,
  }
}
