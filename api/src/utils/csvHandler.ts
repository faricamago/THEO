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

interface Task {
  id: string;
  date: string;
  description: string;
  assignedTo: 'Farica' | 'Yelysei' | 'Both';
  completed: boolean;
  completedDate?: string;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../../data');
const EXPENSES_FILE = path.join(DATA_DIR, 'expenses.csv');
const TASKS_FILE = path.join(DATA_DIR, 'tasks.csv');

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

const ensureTasksFile = () => {
  if (!fs.existsSync(TASKS_FILE)) {
    const headers = 'id,date,description,assignedTo,completed,completedDate\n';
    fs.writeFileSync(TASKS_FILE, headers);
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

export const readTasks = (): Task[] => {
  ensureDataDir();
  ensureTasksFile();
  const content = fs.readFileSync(TASKS_FILE, 'utf-8');
  if (!content.trim()) return [];

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
  });

  return records.map((r: any) => ({
    id: r.id,
    date: r.date,
    description: r.description,
    assignedTo: r.assignedTo,
    completed: r.completed === 'true',
    completedDate: r.completedDate || undefined,
  }));
};

export const writeTasks = (tasks: Task[]): void => {
  ensureDataDir();
  const output = stringify(tasks, { header: true });
  fs.writeFileSync(TASKS_FILE, output);
};
