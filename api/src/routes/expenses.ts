import { Router, Request, Response } from 'express';
import { readExpenses, writeExpenses } from '../utils/csvHandler.js';
import { calculateMonthlySettlement, filterExpensesByMonth } from '../utils/calculations.js';

const router = Router();

interface ExpenseBody {
  person: 'Farica' | 'Yelysei';
  description: string;
  amount: number;
  category: string;
}

router.get('/', (req: Request, res: Response) => {
  try {
    const expenses = readExpenses();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read expenses' });
  }
});

router.get('/settlement/:month/:year', (req: Request, res: Response) => {
  try {
    const { month, year } = req.params;
    const expenses = readExpenses();
    const settlement = calculateMonthlySettlement(expenses, parseInt(month), parseInt(year));
    res.json(settlement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate settlement' });
  }
});

router.get('/month/:month/:year', (req: Request, res: Response) => {
  try {
    const { month, year } = req.params;
    const expenses = readExpenses();
    const filtered = filterExpensesByMonth(expenses, parseInt(month), parseInt(year));
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter expenses' });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const { person, description, amount, category } = req.body as ExpenseBody;

    if (!person || !description || !amount || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const expenses = readExpenses();
    const newExpense = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      person,
      description,
      amount: parseFloat(amount.toString()),
      category,
    };

    expenses.push(newExpense);
    writeExpenses(expenses);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const expenses = readExpenses();
    const filtered = expenses.filter(e => e.id !== id);

    if (filtered.length === expenses.length) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    writeExpenses(filtered);
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

export default router;
