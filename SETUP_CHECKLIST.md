# ✅ Theo Setup Checklist

Complete these steps to get your app running with Supabase:

## 🔵 On Supabase.com (First Time Only)

- [ ] Create account at https://supabase.com
- [ ] Create new project
- [ ] Wait for project to initialize
- [ ] Go to **SQL Editor**
- [ ] Paste and run the SQL from `SUPABASE_SETUP.md`
- [ ] Go to **Settings** → **API**
- [ ] Copy `Project URL` (save it)
- [ ] Copy `anon public` key (save it)

## 🟢 On Your Computer

### In the `frontend` folder:

- [ ] Create a file called `.env.local`
- [ ] Add these lines:
  ```
  VITE_SUPABASE_URL=paste_your_project_url_here
  VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
  ```
- [ ] Save the file
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:5173
- [ ] Try adding an expense
- [ ] Check that it appears in Supabase dashboard (Data Editor → expenses table)

## 🔴 On Vercel (For Deployment)

- [ ] Go to your Vercel project settings
- [ ] Go to **Environment Variables**
- [ ] Add `VITE_SUPABASE_URL` with your Supabase URL
- [ ] Add `VITE_SUPABASE_ANON_KEY` with your anon key
- [ ] Trigger a redeploy (or just push to GitHub)
- [ ] Wait for build to complete
- [ ] Visit your deployed app
- [ ] Test that expenses work

## 🎉 Success Indicators

- ✅ You can add expenses in local dev
- ✅ Expenses appear in Supabase Data Editor
- ✅ You can view expenses in the app
- ✅ You can delete expenses
- ✅ Settlement calculates correctly
- ✅ PDF reports download
- ✅ Vercel deployment works
- ✅ Deployed app works without backend

## 📝 Important Reminders

- 🔒 **Never commit `.env.local`** - It has secrets!
- 📧 **Share only the deployed app URL**, not your Supabase keys
- 💻 **Each person needs their own `.env.local`** if developing locally
- 🚀 **Vercel needs the env vars** to work in production

## ❓ Troubleshooting Quick Fixes

| Issue | Fix |
|-------|-----|
| "Missing environment variables" | Create `.env.local` in `frontend/` folder |
| "Connection failed" | Check URL and key are correct (no extra spaces) |
| "No data showing" | Check `expenses` table exists in Supabase |
| "Build failed on Vercel" | Add env vars to Vercel project settings |
| "PDF doesn't download" | Check browser console for errors |

## 📞 Need Help?

- **Frontend/React issues**: Check browser console (F12)
- **Supabase issues**: https://supabase.com/docs
- **Vercel issues**: https://vercel.com/docs
- **Full setup guide**: Read `SUPABASE_SETUP.md`

---

**All done?** 🎉 Your Theo app is ready to use! Share the Vercel URL with your boyfriend. 🐾
