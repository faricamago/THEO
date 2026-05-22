# 🐾 Theo - Supabase Setup Guide

This document explains how to set up Theo with Supabase for storing expenses data.

## 📋 Prerequisites

- Supabase account (free at https://supabase.com)
- Your Supabase project credentials

## 🚀 Setup Steps

### Step 1: Create Supabase Account & Project

1. Go to https://supabase.com
2. Sign up (free tier)
3. Create a new project
4. Choose a region close to you
5. Set a strong database password and save it
6. Wait for the project to initialize (this takes a few minutes)

### Step 2: Create Database Table

In your Supabase dashboard:

1. Go to the **SQL Editor**
2. Run this SQL query to create the expenses table:

```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL,
  person TEXT NOT NULL CHECK (person IN ('Farica', 'Yelysei')),
  description TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Food', 'Vet', 'Toys', 'Supplies', 'Other')),
  created_at TIMESTAMP DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX idx_expenses_date ON expenses(date);
CREATE INDEX idx_expenses_person ON expenses(person);

-- Enable Row Level Security (optional)
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
```

### Step 3: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - `Project URL` (VITE_SUPABASE_URL)
   - `anon public` key (VITE_SUPABASE_ANON_KEY)

### Step 4: Configure Frontend Environment

1. Create a file in the `frontend` folder called `.env.local`
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

### Step 5: Install Dependencies

```bash
cd frontend
npm install
```

### Step 6: Test Locally

```bash
npm run dev
```

Visit http://localhost:5173 and try adding an expense. If it works, you're all set!

## 🌐 Deploy to Vercel

### Add Environment Variables in Vercel

1. Go to your Vercel project settings
2. Go to **Environment Variables**
3. Add these variables:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon public key

4. Deploy your project

## 📊 Database Structure

The `expenses` table has these columns:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Unique identifier (auto-generated) |
| date | TEXT | Date in YYYY-MM-DD format |
| person | TEXT | 'Farica' or 'Yelysei' |
| description | TEXT | What was purchased |
| amount | NUMERIC | Amount in dollars |
| category | TEXT | Food, Vet, Toys, Supplies, or Other |
| created_at | TIMESTAMP | When the record was created |

## 🆓 Supabase Free Tier Limits

The free tier includes:

- ✅ 500MB database space
- ✅ 2GB file storage
- ✅ 50,000 monthly active users
- ✅ Unlimited API calls
- ✅ Real-time subscriptions

This is more than enough for a personal project like Theo!

## 🔒 Security Notes

- The `anon public` key is intended to be public. It's restricted by Row Level Security policies.
- Supabase handles all database operations securely.
- No sensitive data (like passwords) should be stored in the database.

## 🐛 Troubleshooting

### "Missing Supabase environment variables"

Make sure your `.env.local` file exists in the `frontend` folder with the correct variable names:

```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### "Connection failed"

1. Check that your Supabase project is online
2. Verify the URL and key are correct
3. Check that the `expenses` table exists in your database
4. Check browser console for detailed error messages

### Data not showing up

1. Go to your Supabase dashboard
2. Check the `expenses` table in the Data Editor
3. Verify that data was inserted
4. Check for any filters on the table

## 📞 Support

For Supabase-specific issues, visit: https://supabase.com/docs
