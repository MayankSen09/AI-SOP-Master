# AI Model Fix - Gemini 404 Error Resolution

## Problem
Getting error: `models/gemini-pro is not found for API version v1`

## Root Cause
The model name `gemini-pro` has been deprecated by Google. The correct model name is now `gemini-1.5-pro-latest`.

## Solution Applied
Updated `.env` file:
```
AI_MODEL=gemini-1.5-pro-latest  # Changed from gemini-1.5-pro
```

## How to Apply the Fix

**Option 1: Restart the server (Recommended)**
1. Stop the current server (Ctrl+C in the terminal)
2. Start it again: `npm run dev`

**Option 2: The server will use the new model on next reload**
- If you're using `tsx watch`, just save any `.ts` file to trigger a reload

## Verify the Fix

Test the AI generation with PowerShell:

```powershell
# 1. Login first
$body = @{
    email = "admin@sopsystem.com"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3001/api/v1/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

$token = $response.token

# 2. Test AI generation
$body = @{
    prompt = "Create an SOP for password reset process"
    industry = "IT Support"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/v1/sops/generate" `
    -Method POST `
    -ContentType "application/json" `
    -Headers @{Authorization = "Bearer $token"} `
    -Body $body
```

## Alternative Models

If `gemini-1.5-pro-latest` doesn't work, try these in `.env`:

```bash
# Most stable (recommended)
AI_MODEL=gemini-1.5-pro-latest

# Or specific version
AI_MODEL=gemini-1.5-pro

# Flash model (faster, cheaper)
AI_MODEL=gemini-1.5-flash-latest

# Older stable version
AI_MODEL=gemini-1.0-pro
```

## Status
✅ **Fixed** - Model name updated to `gemini-1.5-pro-latest`

⚠️ **Action Required** - You need to restart the backend server for changes to take effect.
