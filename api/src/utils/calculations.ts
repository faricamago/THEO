interface Expense {
  id: string;
  date: string;
  person: 'Farica' | 'Yelysei';
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

  const faricaTotal = filtered
    .filter(e => e.person === 'Farica')
    .reduce((sum, e) => sum + e.amount, 0);

  const yelyseiTotal = filtered
    .filter(e => e.person === 'Yelysei')
    .reduce((sum, e) => sum + e.amount, 0);

  const difference = Math.abs(faricaTotal - yelyseiTotal);
  const whoOwes = faricaTotal > yelyseiTotal ? 'Yelysei' : faricaTotal < yelyseiTotal ? 'Farica' : 'Even';
  const settleAmount = difference / 2;

  return {
    youTotal: faricaTotal,
    boyfriendTotal: yelyseiTotal,
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
