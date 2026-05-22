# 🐾 Theo - Pet Expense Manager

Beautiful shared pet expense management app built with React and Supabase.

## Features

- **Expense Tracking**: Add and track expenses by person
- **Monthly Settlement**: Automatic calculation of who owes whom
- **PDF Reports**: Generate monthly reports with expense summaries
- **Beautiful UI**: Aesthetic design with neutral color palette
- **Real-time Sync**: Data syncs instantly across devices via Supabase

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Database**: Supabase (PostgreSQL)
- **PDF Generation**: jsPDF (client-side)
- **Deployment**: Vercel (frontend only)

## Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn
- Supabase account (free at https://supabase.com)

### 1. Clone and Install

```bash
git clone <repo>
cd THEO/frontend
npm install
```

### 2. Setup Supabase

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions:

1. Create Supabase project
2. Create expenses table (SQL provided in guide)
3. Get your API credentials
4. Create `.env.local` in `frontend/` folder:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Run Locally

```bash
npm run dev
# Frontend runs on http://localhost:5173
```

### 4. Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy! (build command: `npm run build`)

## Project Structure

```
THEO/
├── frontend/              # React Vite app
│   ├── src/
│   │   ├── pages/        # Expenses, Reports pages
│   │   ├── components/   # UI components
│   │   ├── supabaseClient.ts  # Database functions
│   │   └── pdfGenerator.ts    # PDF creation
│   └── .env.local        # Your Supabase credentials
├── SUPABASE_SETUP.md     # Database setup guide
└── vercel.json           # Deployment config
```

## Usage

### Expenses Tab
- **Add Expense**: Only available for current month
- **View by Person**: See Farica's vs Yelysei's expenses
- **Summary**: View monthly totals and automatic settlement
- **Month/Year Selector**: Browse past/future months

### Reports Tab
- **Generate PDF**: Select month/year and download report
- **Report Contents**: Expense breakdown, totals, and settlement

## Deployment

### Vercel (Frontend)

1. Connect your GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

That's it! No backend needed - Supabase handles all data.

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Color Palette

- Cream: #F5F1E8
- Charcoal: #2C2C2C
- Soft Grey: #E8E6E1
- Dark Grey: #4A4A4A
- Royal Pink: #DB7093
- Pastel Pink: #FFB6C1

## Troubleshooting

**"Missing Supabase environment variables"**
- Create `.env.local` in `frontend/` folder with your credentials
- Make sure variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**Data not loading**
- Check that `expenses` table exists in Supabase
- Verify environment variables are correct
- Check browser console for detailed errors

**PDF generation fails**
- Ensure month/year are correct
- Check browser console for errors

## Supabase Free Tier

The free tier includes:
- ✅ 500MB database space
- ✅ 2GB file storage
- ✅ 50,000 monthly active users
- ✅ Unlimited API calls

Perfect for a personal project!

## Security Notes

- The public API key is safe to share - access is restricted by Supabase
- `.env.local` is never committed (in `.gitignore`)
- No sensitive data is stored in the database

## Future Enhancements

- [ ] User authentication (multiple couples)
- [ ] Multi-pet support
- [ ] Recurring expenses
- [ ] Spending charts
- [ ] Monthly budgets
- [ ] Mobile app

## Support

For Supabase issues: https://supabase.com/docs
For Vercel issues: https://vercel.com/docs

