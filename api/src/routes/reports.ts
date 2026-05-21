import { Router, Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { readExpenses } from '../utils/csvHandler.js';
import { calculateMonthlySettlement, filterExpensesByMonth } from '../utils/calculations.js';

const router = Router();

router.get('/generate', (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ error: 'Month and year required' });
    }

    const expenses = readExpenses();
    const monthlyExpenses = filterExpensesByMonth(expenses, parseInt(month as string), parseInt(year as string));
    const settlement = calculateMonthlySettlement(expenses, parseInt(month as string), parseInt(year as string));

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="theo-report-${month}-${year}.pdf"`);

    doc.pipe(res);

    // Header
    doc.fontSize(24).font('Helvetica-Bold').text("Theo's Pet Care Report", { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text(`${getMonthName(parseInt(month as string))} ${year}`, { align: 'center' });
    doc.moveDown(1);

    // Expenses Summary
    doc.fontSize(16).font('Helvetica-Bold').text('Expenses Summary', { underline: true });
    doc.moveDown(0.5);

    // Your expenses
    doc.fontSize(12).font('Helvetica-Bold').text('Your Expenses:', { underline: true });
    const yourExpenses = monthlyExpenses.filter(e => e.person === 'Farica');
    yourExpenses.forEach(e => {
      doc.fontSize(10).text(`  • ${e.description}: $${e.amount.toFixed(2)} (${e.category})`);
    });
    doc.fontSize(11).font('Helvetica-Bold').text(`Your Total: $${settlement.youTotal.toFixed(2)}`);
    doc.moveDown(0.5);

    // Yelysei's expenses
    doc.fontSize(12).font('Helvetica-Bold').text("Yelysei's Expenses:", { underline: true });
    const bfExpenses = monthlyExpenses.filter(e => e.person === 'Yelysei');
    bfExpenses.forEach(e => {
      doc.fontSize(10).text(`  • ${e.description}: $${e.amount.toFixed(2)} (${e.category})`);
    });
    doc.fontSize(11).font('Helvetica-Bold').text(`Yelysei's Total: $${settlement.boyfriendTotal.toFixed(2)}`);
    doc.moveDown(1);

    // Settlement
    doc.fontSize(14).font('Helvetica-Bold').text('Settlement', { underline: true });
    if (settlement.whoOwes === 'Even') {
      doc.fontSize(11).text('All even! 🎉');
    } else {
      doc.fontSize(11).text(`${settlement.whoOwes} owes $${settlement.amount.toFixed(2)}`);
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

function getMonthName(month: number): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month - 1] || '';
}

export default router;
