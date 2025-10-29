# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hatch Track is a full-stack web application with a React/Vite frontend and Node.js/Express/MongoDB backend. It provides separate authentication and dashboards for both regular users (phone-based) and administrators (username/password-based).

## Architecture

### Frontend (Frontend/)
- **Framework**: React 19 with Vite 7 as build tool
- **Routing**: React Router v7 for navigation between pages
- **Styling**: CSS modules + Tailwind CSS + Framer Motion for animations
- **Main Components**:
  - `HomePage.jsx` - Landing page
  - `UserLogin.jsx` - User authentication (phone number-based)
  - `UserDashboard.jsx` - User main interface
  - `UserProfile.jsx` - Individual user profile view
  - `AdminLogIn.jsx` (LogIn.jsx) - Admin authentication
  - `AdminDashboard.jsx` - Admin control panel
  - `AdminProfile.jsx` - Admin profile management
  - `ProfileCard.jsx` - Reusable profile card component

### Backend (Backend/)
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: MVC pattern
  - `model/` - Mongoose schemas (User.model.js, Admin.model.js)
  - `controllers/` - Business logic (Auth.controller.js)
  - `routes/` - API endpoints (Auth.route.js)
- **Authentication**: bcryptjs for password hashing (admin only)
- **Port**: 3000

### Database Schema
- **User Model**: phoneNumber (unique), timestamps
- **Admin Model**: username (unique), email (unique), password (hashed), timestamps

### API Endpoints (all prefixed with `/api`)
- `POST /Admin-signup` - Register new admin
- `POST /Admin-login` - Admin login
- `POST /User-signup` - Register user by phone
- `POST /User-login` - User phone verification (OTP planned)

## Development Commands

### Frontend
```bash
cd Frontend
npm install           # Install dependencies
npm run dev          # Start dev server (Vite)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend
```bash
cd Backend
npm install           # Install dependencies
node server.js       # Start backend server
# Note: nodemon is installed but no script configured
```

### Environment Setup
Backend requires `.env` file with:
- `DBurl` - MongoDB connection string

## Key Patterns

### Routing Flow
- Root (`/`) → HomePage
- User flow: `/user-login` → `/user-dashboard` → `/user/:name` (profile)
- Admin flow: `/admin-login` → `/admin-dashboard` → `/admin-profile`
- Fallback: All unknown routes redirect to `/`

### Authentication Approach
- **Admin**: Traditional username/password with bcrypt hashing
- **User**: Phone number-based with planned OTP verification (currently placeholder)

### Data Flow
- Frontend makes fetch/axios calls to `http://localhost:3000/api/*`
- Backend controllers handle validation and database operations
- Mongoose models define schema and interact with MongoDB

## Current State

### Active Branch
- Current: `UserInterface`
- Main branch: `main`

### Recent Changes
- Modified `Frontend/package.json` and `package-lock.json`
- Updated `HomePage.jsx` and `HomePage.css`
- Untracked file: `package-lock.json` in root

### Incomplete Features
- User login OTP verification system (placeholder at Auth.controller.js:89)
- AdminProfile.controller.js exists but is empty
- Multiple route files exist but only Auth.route.js is actively used

## Important Notes

- The backend has legacy commented code in server.js (lines 1-38) showing previous MongoDB native driver implementation
- Deprecated Mongoose options (useNewUrlParser, useUnifiedTopology) are used but can be safely removed
- Frontend uses both React 19 and modern features (no TypeScript)
- ESLint configured but no TypeScript integration
