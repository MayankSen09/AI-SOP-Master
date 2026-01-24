# Supabase Database Setup Guide

## Step 1: Configure Database Connection

Your `.env` file has been created with the Supabase connection string.

**IMPORTANT:** You need to replace `[YOUR-PASSWORD]` with your actual Supabase database password.

1. Open `.env` file
2. Find the line: `DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.ftwgxenprwqlnvjkdwsx.supabase.co:5432/postgres`
3. Replace `[YOUR-PASSWORD]` with your Supabase database password
4. Save the file

**Where to find your password:**
- Go to your Supabase project dashboard
- Navigate to Settings > Database
- Look for "Database Password" - you set this when creating the project
- If forgotten, you can reset it from the same page

---

## Step 2: Install Dependencies

```bash
cd backend
npm install
```

---

## Step 3: Setup Database Schema

Run these commands in order:

```bash
# Generate Prisma Client
npm run db:generate

# Create database tables (run migrations)
npm run db:push

# Seed database with test users
npm run db:seed
```

**Expected Output:**
```
🌱 Seeding database...
✅ Created admin user: admin@sopsystem.com
✅ Created manager user: manager@sopsystem.com
✅ Created contributor user: contributor@sopsystem.com
✅ Created sample SOP: Employee Onboarding Process
✅ Created activity log

🎉 Seeding completed!

Test Accounts:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Admin:       admin@sopsystem.com / admin123
Manager:     manager@sopsystem.com / manager123
Contributor: contributor@sopsystem.com / contributor123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Step 4: Start Backend Server

```bash
npm run dev
```

**Expected Output:**
```
    ╔═══════════════════════════════════════╗
    ║   SOP System Backend API              ║
    ║   Environment: development            ║
    ║   Port: 3001                          ║
    ║   API Version: v1                     ║
    ╚═══════════════════════════════════════╝

Server running at http://localhost:3001
API available at http://localhost:3001/api/v1
Health check: http://localhost:3001/health
```

---

## Step 5: Test the API

### Health Check
```bash
curl http://localhost:3001/health
```

### Register a new user
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@sopsystem.com",
    "password": "admin123"
  }'
```

**Copy the token from the response and use it for authenticated requests:**

```bash
curl http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Troubleshooting

### "Connection refused" error
- Make sure your DATABASE_URL password is correct
- Check if you can access internet (Supabase is cloud-hosted)
- Verify the connection string in Supabase dashboard

### "Migration failed" error
- Make sure you ran `npm run db:generate` first
- Try `npm run db:push` instead of `db:migrate` for Supabase
- Check Supabase dashboard for any connection limits

### "Port 3001 already in use"
- Change PORT in `.env` to another number (e.g., 3002)
- Or stop the process using port 3001

---

## View Database in Supabase

1. Go to your Supabase project dashboard
2. Click on "Table Editor" in the left sidebar
3. You should see tables like:
   - User
   - SOP
   - WizardSession
   - AIPromptLog
   - ActivityLog
   - ExportJob

---

## Next Steps

Once the backend is running successfully:

1. ✅ Backend API is live at `http://localhost:3001`
2. ✅ Test users are created
3. ✅ Database schema is set up
4. 🚀 Ready to implement AI services and SOP endpoints!
