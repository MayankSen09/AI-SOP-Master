# Backend Quick Start Guide

## 🚀 Running the Backend

The backend server is currently **running** on port 3001.

### Server Endpoints

```
Root:        http://localhost:3001/
Health:      http://localhost:3001/health
API Base:    http://localhost:3001/api/v1
```

---

## 🧪 Testing the API

### 1. Visit Root Endpoint
Open in browser or curl:
```bash
http://localhost:3001/
```

You should see:
```json
{
  "name": "SOP System Backend API",
  "version": "v1",
  "status": "running",
  "documentation": {
    "health": "/health",
    "api": "/api/v1",
    "endpoints": {
      "auth": "/api/v1/auth",
      "sops": "/api/v1/sops",
      "wizard": "/api/v1/wizard",
      "dashboard": "/api/v1/dashboard"
    }
  },
  "message": "Welcome to the SOP Management System API..."
}
```

### 2. Test Login (PowerShell)

```powershell
$body = @{
    email = "admin@sopsystem.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/v1/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

**Expected Response:**
```json
{
  "user": {
    "id": "...",
    "email": "admin@sopsystem.com",
    "name": "System Administrator",
    "role": "ADMIN"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Generate SOP with AI (PowerShell)

First, save your token from login:
```powershell
$token = "YOUR_JWT_TOKEN_HERE"

$body = @{
    prompt = "Create an SOP for handling customer refund requests"
    industry = "E-commerce"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/v1/sops/generate" `
    -Method POST `
    -ContentType "application/json" `
    -Headers @{Authorization = "Bearer $token"} `
    -Body $body
```

### 4. Get Dashboard Stats (PowerShell)

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/v1/dashboard/stats" `
    -Method GET `
    -Headers @{Authorization = "Bearer $token"}
```

---

## 📝 Test Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@sopsystem.com | admin123 | ADMIN |
| manager@sopsystem.com | manager123 | MANAGER |
| contributor@sopsystem.com | contributor123 | CONTRIBUTOR |

---

## 🔗 Using with Postman or Insomnia

1. **Import Base URL:** `http://localhost:3001/api/v1`

2. **Login to get token:**
   - POST `/auth/login`
   - Body: `{"email":"admin@sopsystem.com","password":"admin123"}`

3. **Set Authorization:**
   - Type: Bearer Token
   - Token: (paste the token from login response)

4. **Test endpoints:**
   - GET `/sops` - List SOPs
   - POST `/sops/generate` - AI generate SOP
   - GET `/dashboard/stats` - Dashboard data
   - POST `/wizard/sessions` - Start wizard

---

## 📂 Database

The SQLite database is located at:
```
C:\Users\mayan\.gemini\antigravity\scratch\sop-system\backend\dev.db
```

You can view it with tools like:
- DB Browser for SQLite
- SQLiteStudio
- VS Code SQLite extension

---

## 🛠️ Development Commands

```bash
# Start server (if not running)
npm run dev

# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Seed database
npm run db:seed

# Build for production
npm run build

# Start production server
npm start
```

---

## 📖 Full API Documentation

See: `backend_api_reference.md` for complete endpoint documentation with examples.

---

## ✅ Verification Checklist

- [x] Server running on port 3001
- [x] Root endpoint returns API info
- [x] Health check responds
- [x] Authentication endpoints working
- [x] Database seeded with test data
- [x] AI service initialized (Gemini 1.5 Pro)
- [x] All 18 endpoints accessible
- [x] RBAC middleware active
- [x] Rate limiting enabled
- [x] Logging operational

**Status: 🟢 All Systems Operational**
