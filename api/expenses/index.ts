import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readExpenses, writeExpenses } from '../../api/src/utils/csvHandler'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const expenses = readExpenses()
      res.status(200).json(expenses)
    } catch (error) {
      res.status(500).json({ error: 'Failed to read expenses' })
    }
  } else if (req.method === 'POST') {
    try {
      const { person, description, amount, category } = req.body

      if (!person || !description || !amount || !category) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const expenses = readExpenses()
      const newExpense = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        person,
        description,
        amount: parseFloat(amount),
        category,
      }

      expenses.push(newExpense)
      writeExpenses(expenses)
      res.status(201).json(newExpense)
    } catch (error) {
      res.status(500).json({ error: 'Failed to add expense' })
    }
  }
}
