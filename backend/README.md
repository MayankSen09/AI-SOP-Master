# SOP System Backend API

Production-grade backend API for the SOP Management System, built with Node.js, TypeScript, Express, Prisma, and Google Generative AI.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- Redis (optional, for production)
- Google AI API Key

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your credentials
# Required: DATABASE_URL, GOOGLE_AI_API_KEY, JWT_SECRET
```

### Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database with test users
npm run db:seed

# Open Prisma Studio (GUI)
npm run db:studio
```

### Development

```bash
# Start development server
npm run dev

# Server will run at http://localhost:3001
# API available at http://localhost:3001/api/v1
```

### Production Build

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration (env, database, AI)
│   ├── middleware/      # Auth, RBAC, rate limiting, error handling
│   ├── services/        # Business logic
│   ├── controllers/     # Route handlers
│   ├── routes/          # API routes
│   ├── models/          # Type definitions
│   ├── utils/           # Helper functions
│   └── app.ts           # Express app setup
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data
└── tests/               # Test files
```

## 🔐 Authentication

### Register
```bash
POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "VIEWER"  # Optional: ADMIN | MANAGER | CONTRIBUTOR | VIEWER
}
```

### Login
```bash
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

# Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Profile
```bash
GET /api/v1/auth/me
Authorization: Bearer <token>
```

## 🧪 Test Accounts

After running `npm run db:seed`, you can login with:

```
Admin:       admin@sopsystem.com / admin123
Manager:     manager@sopsystem.com / manager123
Contributor: contributor@sopsystem.com / contributor123
```

## 📊 Database Models

- **User** - Authentication and user management
- **SOP** - Standard Operating Procedures with versioning
- **WizardSession** - Multi-step SOP creation sessions
- **AIPromptLog** - AI request/response tracking
- **ActivityLog** - System activity feed
- **ExportJob** - PDF/DOCX export jobs

## 🤖 AI Integration

The backend uses Google Generative AI (Gemini) for SOP generation:
- Structured output with JSON schemas
- Rate limiting and retry logic
- Prompt template system
- Token usage tracking

## 🛡️ Security Features

- ✅ JWT authentication
- ✅ Role-based access control (RBAC)
- ✅ Password hashing with bcrypt
- ✅ Rate limiting (API + AI endpoints)
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error logging

## 📝 API Documentation

### Health Check
```
GET /health
```

### Authentication
```
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

### SOPs (Coming Soon)
```
GET    /api/v1/sops
POST   /api/v1/sops
GET    /api/v1/sops/:id
PATCH  /api/v1/sops/:id
DELETE /api/v1/sops/:id
```

### SOP Wizard (Coming Soon)
```
POST   /api/v1/wizard/start
POST   /api/v1/wizard/session/:id/step
POST   /api/v1/wizard/session/:id/finalize
```

## 🔧 Environment Variables

See `.env.example` for all available options. Key variables:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sop_db

# AI
GOOGLE_AI_API_KEY=your-api-key

# Security
JWT_SECRET=your-secret-key
```

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

## 📦 Production Deployment

1. Set `NODE_ENV=production`
2. Configure production DATABASE_URL
3. Set strong JWT_SECRET
4. Enable Redis for caching (optional)
5. Configure logging (Sentry, etc.)
6. Run migrations: `npm run db:migrate`
7. Build: `npm run build`
8. Start: `npm start`

## 🐛 Debugging

- Logs are written to `logs/` directory in production
- Use Prisma Studio to inspect database: `npm run db:studio`
- Check health endpoint: `GET /health`

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [Google AI SDK](https://ai.google.dev/docs)

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Add tests for new features
3. Update API documentation
4. Run linting: `npm run lint`

---

Built with ❤️ using TypeScript + Express + Prisma + Google AI
