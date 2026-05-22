import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { fileURLToPath } from 'url';

interface Expense {
  id: string;
  date: string;
  person: 'Farica' | 'Yelysei';
  description: string;
  amount: number;
  category: string;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../../data');
const EXPENSES_FILE = path.join(DATA_DIR, 'expenses.csv');

const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};

const ensureExpensesFile = () => {
  if (!fs.existsSync(EXPENSES_FILE)) {
    const headers = 'id,date,person,description,amount,category\n';
    fs.writeFileSync(EXPENSES_FILE, headers);
  }
};

export const readExpenses = (): Expense[] => {
  ensureDataDir();
  ensureExpensesFile();
  const content = fs.readFileSync(EXPENSES_FILE, 'utf-8');
  if (!content.trim()) return [];

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
  });

  return records.map((r: any) => ({
    id: r.id,
    date: r.date,
    person: r.person,
    description: r.description,
    amount: parseFloat(r.amount),
    category: r.category,
  }));
};

export const writeExpenses = (expenses: Expense[]): void => {
  ensureDataDir();
  const output = stringify(expenses, { header: true });
  fs.writeFileSync(EXPENSES_FILE, output);
};
