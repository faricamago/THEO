export interface Expense {
  id: string
  date: string
  person: 'Farica' | 'Yelysei'
  description: string
  amount: number
  category: string
}

export interface Settlement {
  youTotal: number
  boyfriendTotal: number
  difference: number
  whoOwes: string
  amount: number
}
