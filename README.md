# 🐾 Theo - Pet Expense & Task Manager

Beautiful shared pet expense and task management app for you and your boyfriend.

## Features

- **Expense Tracking**: Add and track expenses by person
- **Monthly Settlement**: Automatic calculation of who owes whom
- **PDF Reports**: Generate monthly reports with expense summaries
- **Task Management**: Shared to-do list for pet care tasks
- **Beautiful UI**: Aesthetic design with neutral color palette

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: Node.js + Express
- **Data**: CSV file storage (no database required)
- **Deployment**: Vercel (frontend) + Node.js (backend)

## Local Development

### Prerequisites
- Node.js 18+
- npm/yarn

### Setup

1. **Install dependencies**
```bash
npm install --workspaces
```

2. **Start the backend** (Terminal 1)
```bash
cd api
npm run dev
# Backend runs on http://localhost:3001
```

3. **Start the frontend** (Terminal 2)
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

4. **Access the app**
Open http://localhost:5173 in your browser

## Usage

### Expenses Tab
- **Add Expense**: Fill in the form with who spent what on what
- **View by Person**: See your expenses vs boyfriend's expenses
- **Summary**: View monthly totals and settlement
- **Month/Year Selector**: View expenses for any month

### Tasks Tab
- **Add Task**: Create a new task and assign to Farica, Yelysei, or Both
- **Mark Complete**: Check off completed tasks
- **Delete**: Remove tasks as needed

### Reports Tab
- **Generate PDF**: Select a month/year and download a formatted PDF report
- **Report Contents**: Includes expense breakdown, totals, and settlement

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect to Vercel
3. Set build command: `cd frontend && npm run build`
4. Set output directory: `frontend/dist`

### Backend
For production deployment, you have options:
- **Railway, Heroku, or Render**: Deploy the `/api` folder
- **AWS Lambda/DigitalOcean**: Use serverless functions
- **Self-hosted VPS**: Run as a Node.js service

Backend environment variable:
```
PORT=3001
```

## Project Structure

```
THEO/
├── frontend/          # React Vite app
├── api/              # Express backend
└── vercel.json       # Deployment config
```

## Color Palette

- Cream: #F5F1E8
- Charcoal: #2C2C2C
- Soft Grey: #E8E6E1
- Dark Grey: #4A4A4A

## CSV Data Format

**expenses.csv**
```
id,date,person,description,amount,category
```

**tasks.csv**
```
id,date,description,assignedTo,completed,completedDate
```

Data is persisted in `/api/data/` directory.

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/month/:month/:year` - Get expenses for a month
- `GET /api/expenses/settlement/:month/:year` - Get settlement info
- `POST /api/expenses` - Add expense
- `DELETE /api/expenses/:id` - Delete expense

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Add task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Reports
- `GET /api/reports/generate?month=M&year=Y` - Generate PDF

## Scripts

**Frontend**
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
```

**Backend**
```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build TypeScript
npm start        # Run production build
```

## Troubleshooting

**Backend not connecting**
- Ensure backend is running on port 3001
- Check CORS settings if using different domain
- Verify `/api/health` returns `{status: 'ok'}`

**CSV files not saving**
- Ensure `/api/data` directory exists
- Check file permissions
- Restart backend

**PDF generation errors**
- Verify month/year parameters are correct
- Ensure pdfkit is installed: `npm install pdfkit`

## Future Enhancements

- [ ] User authentication
- [ ] Multi-pet support
- [ ] Recurring expenses
- [ ] Monthly budgets
- [ ] Email reports
- [ ] Mobile app
