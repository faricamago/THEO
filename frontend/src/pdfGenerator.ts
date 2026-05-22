import { jsPDF } from 'jspdf'
import { Expense } from './supabaseClient'

export const generatePDFReport = (expenses: Expense[], month: number, year: number) => {
  const doc = new jsPDF()
  
  const monthName = new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long' })
  const title = `Theo's Pet Care Report - ${monthName} ${year}`
  
  // Colors
  const darkColor = [44, 44, 44] // charcoal
  const pinkColor = [219, 112, 147] // royal-pink
  const greyColor = [150, 150, 150]
  
  // Title
  doc.setFontSize(20)
  doc.setTextColor(...darkColor)
  doc.text(title, 15, 20)
  
  // Separator line
  doc.setLineWidth(0.5)
  doc.line(15, 25, 195, 25)
  
  let yPosition = 35
  
  // Calculate totals
  const faricaExpenses = expenses.filter(e => e.person === 'Farica')
  const yelyseiExpenses = expenses.filter(e => e.person === 'Yelysei')
  
  const faricaTotal = faricaExpenses.reduce((sum, e) => sum + e.amount, 0)
  const yelyseiTotal = yelyseiExpenses.reduce((sum, e) => sum + e.amount, 0)
  const difference = Math.abs(faricaTotal - yelyseiTotal)
  const settlement = difference / 2
  
  // Farica's Expenses
  doc.setFontSize(14)
  doc.setTextColor(...pinkColor)
  doc.text(`Farica's Expenses - Total: $${faricaTotal.toFixed(2)}`, 15, yPosition)
  yPosition += 8
  
  doc.setFontSize(10)
  doc.setTextColor(...darkColor)
  
  let faricaY = yPosition
  faricaExpenses.forEach((expense, index) => {
    if (faricaY > 250) {
      doc.addPage()
      faricaY = 20
    }
    const dateStr = new Date(expense.date).toLocaleDateString()
    doc.text(`${index + 1}. ${expense.description} (${expense.category}) - $${expense.amount.toFixed(2)} on ${dateStr}`, 20, faricaY)
    faricaY += 6
  })
  
  yPosition = faricaY + 10
  
  // Yelysei's Expenses
  doc.setFontSize(14)
  doc.setTextColor(...darkColor)
  doc.text(`Yelysei's Expenses - Total: $${yelyseiTotal.toFixed(2)}`, 15, yPosition)
  yPosition += 8
  
  doc.setFontSize(10)
  doc.setTextColor(...darkColor)
  
  let yelyseiY = yPosition
  yelyseiExpenses.forEach((expense, index) => {
    if (yelyseiY > 250) {
      doc.addPage()
      yelyseiY = 20
    }
    const dateStr = new Date(expense.date).toLocaleDateString()
    doc.text(`${index + 1}. ${expense.description} (${expense.category}) - $${expense.amount.toFixed(2)} on ${dateStr}`, 20, yelyseiY)
    yelyseiY += 6
  })
  
  yPosition = Math.max(faricaY, yelyseiY) + 15
  
  // Settlement
  if (yPosition > 230) {
    doc.addPage()
    yPosition = 20
  }
  
  doc.setLineWidth(0.5)
  doc.line(15, yPosition - 5, 195, yPosition - 5)
  
  doc.setFontSize(14)
  doc.setTextColor(...darkColor)
  doc.text('Settlement', 15, yPosition + 5)
  
  yPosition += 12
  
  doc.setFontSize(12)
  if (faricaTotal === yelyseiTotal) {
    doc.setTextColor(34, 197, 94) // green
    doc.text('All settled!', 15, yPosition)
  } else {
    doc.setTextColor(...darkColor)
    const whoOwes = faricaTotal > yelyseiTotal ? 'Yelysei' : 'Farica'
    doc.text(`${whoOwes} owes $${settlement.toFixed(2)}`, 15, yPosition)
  }
  
  // Save the PDF
  doc.save(`theo-report-${month}-${year}.pdf`)
}
