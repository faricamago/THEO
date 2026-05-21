export interface Expense {
  id: string
  date: string
  person: 'You' | 'Boyfriend'
  description: string
  amount: number
  category: string
}

export interface Task {
  id: string
  date: string
  description: string
  assignedTo: 'You' | 'Boyfriend' | 'Both'
  completed: boolean
  completedDate?: string
}

export interface Settlement {
  youTotal: number
  boyfriendTotal: number
  difference: number
  whoOwes: string
  amount: number
}
