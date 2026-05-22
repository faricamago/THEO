# Theo - Features Guide

## 🐾 Overview

Theo is a beautiful, shared expense and settlement management app designed for couples managing pet care together. Track who spent what and calculate fair settlements.

---

## 💰 Expenses Tab

### Adding an Expense

1. Click the **"Expenses"** tab in the navigation
2. Fill in the form:
   - **Who?** - Select "Farica" or "Yelysei"
   - **Category** - Choose from: Food, Vet, Toys, Supplies, Other
   - **Description** - What was bought (e.g., "Dog food bag", "Vet checkup")
   - **Amount** - How much was spent (in dollars)
3. Click **"Add Expense"** button

**Example:**
- Farica spend $45.99 on dog food → Recorded as "Farica" expense
- Yelysei spends $150 on vet visit → Recorded as "Yelysei" expense

### Viewing Expenses

**Summary Tab** - See the monthly overview:
- Your total spending
- Yelysei's total spending
- **Settlement calculation** - Who owes whom how much

**Your Expenses Tab** - See only your expenses:
- Listed with date, description, amount
- Sorted by date (newest first)
- Delete button to remove mistakes

**Yelysei's Expenses Tab** - See his expenses:
- Same layout as yours
- Shows his spending patterns
- Can be deleted by either user

### Month/Year Selector

- Select any month and year at the top
- View past months' data
- Compare spending across different months

### Deleting an Expense

1. Find the expense in the list
2. Click the **✕** button on the right
3. Expense is removed immediately

---

## 🤝 Settlement Calculation

At the end of each month, Theo automatically calculates:

**How it works:**
1. Sum all "Farica" expenses
2. Sum all "Yelysei" expenses
3. Calculate the difference
4. Divide by 2 to determine fair split
5. Determine who owes whom

**Example:**
- Farica spent: $500
- Yelysei spent: $300
- Difference: $200
- Settlement: **Yelysei owes Farica $100**
  - (They spent $100 less, so they owe half the difference)

**Display:**
The settlement appears in the Summary tab with:
- Clear message of who owes whom
- Exact amount (to the cent)
- "All even! 🎉" if you spent equally

---

## 📊 Reports Tab

### Generating a Monthly Report

1. Click the **"Reports"** tab
2. Select **Month** from dropdown
3. Enter **Year**
4. Click **"📥 Download PDF Report"**

### PDF Report Contents

The generated PDF includes:

**Header:**
- "Theo's Pet Care Report"
- Selected month and year

**Your Expenses:**
- Itemized list of all your expenses
- Shows: Description, Amount, Category
- **Total for Farica**

**Yelysei's Expenses:**
- Itemized list of his expenses
- Shows: Description, Amount, Category
- **Total for Yelysei**

**Settlement:**
- Who owes whom
- Exact amount to settle
- Clear and printable format

### Uses for Reports

- **Monthly review** - See spending trends
- **Share with partner** - Settle up at month end
- **Recordkeeping** - Archive for reference
- **Budget planning** - Identify spending patterns
- **Tax purposes** - Document pet care expenses

---

## 🎨 Design & Navigation

### Navigation Bar

- **Theo 🐾** - Logo (click to stay on current page)
- **Expenses** - Add and view expenses
- **Reports** - Generate and download PDFs

### Color Scheme

- **Cream (#F5F1E8)** - Soft background accents
- **Charcoal (#2C2C2C)** - Main text and buttons
- **Soft Grey (#E8E6E1)** - Subtle separators
- **Dark Grey (#4A4A4A)** - Secondary text

### Responsive Design

- Works on desktop, tablet, and mobile
- Touch-friendly buttons and inputs
- Readable on small screens

---

## 📱 Tips & Tricks

### For Accurate Settlements

1. **Add expenses immediately** when you spend money
2. **Settle up monthly** using the settlement amount
3. **Keep categories consistent** (Food, Vet, etc.)

### Data Organization

1. **One month at a time** - Focus on current month by default
2. **Review past months** - Use month/year selector
3. **Download reports** - Keep PDF copies for records

### Sharing the App

- Both users can access the same app instance
- No need for separate accounts (currently)
- Data persists between sessions
- Any device can add expenses

---

## ⚠️ Important Notes

### Data Storage

- **Expenses** are stored in CSV files
- **Data persists** between sessions
- **No automatic backup** - Save PDFs for records
- **Shared access** - Anyone with app access can view/edit all data

### Current Limitations

- No user authentication (anyone with URL can access)
- No edit feature (delete and re-add to change)
- No recurring expenses
- No budget alerts

### Future Enhancements

- User login/authentication
- Multi-pet support
- Recurring expenses
- Email reminders
- Spending charts and statistics
- Mobile app native version

---

## 🚀 Getting Started Checklist

- [ ] Understand expense tracking workflow
- [ ] Learn settlement calculation logic
- [ ] Practice adding expenses
- [ ] Generate your first monthly report
- [ ] Set a regular settlement day (e.g., end of month)
- [ ] Share app URL with your partner
- [ ] Start tracking Theo's expenses!

---

## 📞 Support

For questions or issues:
1. Check the **README.md** for setup
2. Review the **DEPLOYMENT.md** for hosting
3. Check your **browser console** for error messages
4. Verify the **backend is running** (http://localhost:3001/api/health)

---

Enjoy managing Theo's expenses together! 🐾💰
