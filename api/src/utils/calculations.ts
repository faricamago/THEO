interface Expense {
  id: string;
  date: string;
  person: 'You' | 'Boyfriend';
  description: string;
  amount: number;
  category: string;
}

interface Settlement {
  youTotal: number;
  boyfriendTotal: number;
  difference: number;
  whoOwes: string;
  amount: number;
}

export const calculateMonthlySettlement = (expenses: Expense[], month: number, year: number): Settlement => {
  const filtered = expenses.filter(e => {
    const date = new Date(e.date);
    return date.getMonth() + 1 === month && date.getFullYear() === year;
  });

  const youTotal = filtered
    .filter(e => e.person === 'You')
    .reduce((sum, e) => sum + e.amount, 0);

  const boyfriendTotal = filtered
    .filter(e => e.person === 'Boyfriend')
    .reduce((sum, e) => sum + e.amount, 0);

  const difference = Math.abs(youTotal - boyfriendTotal);
  const whoOwes = youTotal > boyfriendTotal ? 'Boyfriend' : youTotal < boyfriendTotal ? 'You' : 'Even';
  const settleAmount = difference / 2;

  return {
    youTotal,
    boyfriendTotal,
    difference,
    whoOwes,
    amount: settleAmount,
  };
};

export const filterExpensesByMonth = (expenses: Expense[], month: number, year: number): Expense[] => {
  return expenses.filter(e => {
    const date = new Date(e.date);
    return date.getMonth() + 1 === month && date.getFullYear() === year;
  });
};
