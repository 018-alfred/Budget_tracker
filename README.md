<div align="center">

<img src="client/image/header logo blueBT.png" alt="Budget Tracker Logo" width="160" />

# Budget Tracker

**A modern personal finance platform to track, plan, and master your money.**  
Expense Tracking · Budget Planning · Income Insights · Visual Analytics · Secure Authentication · Cloud Database

<br>

<a href="https://budgettracker-gray.vercel.app/" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/OPEN-BUDGET%20TRACKER-00C896?style=for-the-badge&logo=googlechrome&logoColor=black" alt="Open Budget Tracker Live Website" style="border-radius:20px;" />
</a>

<br><br>

<table>
  <tr>
    <td align="center">
      <a href="https://vercel.com/">
        <img src="https://img.shields.io/badge/Hosting-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
      </a><br>
      <strong>Hosting</strong>
    </td>
    <td align="center">
      <a href="https://clerk.com/">
        <img src="https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" />
      </a><br>
      <strong>Authentication</strong>
    </td>
    <td align="center">
      <a href="https://supabase.com/">
        <img src="https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
      </a><br>
      <strong>Database</strong>
    </td>
    <td align="center">
      <a href="https://nodejs.org/">
        <img src="https://img.shields.io/badge/API-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
      </a><br>
      <strong>Backend API</strong>
    </td>
  </tr>
</table>

<br>

[![HTML5](https://img.shields.io/badge/HTML5-Structure-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Interface-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Logic-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-API-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

</div>

---

## About

**Budget Tracker** is a personal finance management platform built to help individuals take control of their money. It brings together income tracking, expense logging, budget planning, and visual spending insights inside one clean, easy-to-use interface.

The platform is designed so users can log transactions, set budgets, and instantly see where their money is going — without spreadsheets or guesswork. Every entry, category, and budget goal is backed by a live cloud database instead of static or local-only storage.

The project combines a responsive frontend, Clerk authentication, a Node.js backend API, Supabase database integration, and Vercel deployment into a single cohesive financial tool.

---

## Platform Highlights

### User Experience

- Track daily income and expenses in a clean, distraction-free dashboard.
- Categorize transactions (food, travel, bills, savings, and more).
- Set monthly or custom budget limits per category.
- View real-time balance, total spend, and remaining budget at a glance.
- Visualize spending patterns through charts and summaries.
- Use authentication-powered pages where login, signup, logout, and session handling are managed consistently.
- Access a fully responsive interface across desktop, tablet, and mobile.

### Core Financial Tools

The platform goes beyond simple logging — it acts as a lightweight financial control center.

Users can manage:

- Income entries and sources
- Expense entries and categories
- Monthly budget limits
- Spending history and trends
- Category-wise breakdowns
- Account/profile details

---

## Detailed Feature Breakdown

### Clerk Authentication

Authentication is handled through **Clerk**, giving the project a secure, production-ready login system without building auth from scratch.

Key auth behavior:

- Clerk-powered login and signup pages
- Persistent user session handling across pages
- Personalized dashboard greeting after login
- Secure logout support
- Protected routes for authenticated-only pages
- Smooth session state without login/logout flicker

This ensures every user's financial data stays private and tied to their own account.

---

### Node.js Backend API

A custom **Node.js** API layer sits between the frontend and the database, handling business logic, validation, and secure data operations.

The backend handles:

- Transaction creation, updates, and deletion
- Budget calculations and limit checks
- Category management
- Request validation and error handling
- Secure communication with Supabase
- Clean REST endpoints consumed by the frontend

This keeps sensitive logic off the client and makes the platform easier to scale.

---

### Supabase Database Integration

Supabase is used as the hosted database layer for all dynamic financial data.

The project uses Supabase for:

- Income records
- Expense records
- Budget categories and limits
- Transaction history
- User profile data
- Analytics reads and writes

This keeps financial data live, persistent, and queryable instead of being stored locally in the browser.

---

## Expense & Budget Engine

The core of Budget Tracker is its transaction and budgeting engine.

### Transaction Management

Users can log transactions with:

- Amount
- Category
- Type (income or expense)
- Date
- Optional notes/description
- Edit and delete controls

### Budget Planning

Each budget category can include:

- Category name
- Monthly limit
- Current spend
- Remaining balance
- Over-budget warning state

### Dashboard Insights

Users can:

- View total income vs. total expenses
- See current balance at a glance
- Track budget usage per category
- Identify overspending categories
- Review recent transaction activity

---

## Visual Analytics

Budget Tracker turns raw numbers into clear, readable insights.

| Insight | Purpose |
| --- | --- |
| Income vs Expense | Compares money earned against money spent |
| Category Breakdown | Shows where spending is concentrated |
| Budget Usage | Displays percentage of budget used per category |
| Monthly Trend | Tracks spending behavior over time |
| Balance Summary | Gives a quick snapshot of overall financial health |

This makes everyday budgeting feel intuitive instead of overwhelming.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript |
| Authentication | Clerk |
| Backend | Node.js |
| API Style | REST API |
| Database | Supabase (PostgreSQL) |
| Frontend Hosting | Vercel |
| Version Control | Git, GitHub |
| Development Tools | VS Code, Browser DevTools |

---

## Architecture Overview

```txt
User
 │
 ▼
Frontend on Vercel
HTML / CSS / JavaScript
 │
 ├── Authentication: Clerk
 │     ├── Login
 │     ├── Signup
 │     ├── Session handling
 │     └── Logout
 │
 ├── Backend API: Node.js
 │     ├── Transaction endpoints
 │     ├── Budget endpoints
 │     ├── Validation & error handling
 │     └── Supabase communication layer
 │
 └── Database: Supabase
       ├── Income records
       ├── Expense records
       ├── Budget categories
       └── User profile data
```

---

## Project Structure

```txt
Budget_tracker/
│
├── client/
│   ├── assets/
│   │   └── image/
│   │       └── header logo blueBT.png
│   │
│   ├── index.html
│   ├── dashboard.html
│   ├── transactions.html
│   ├── budgets.html
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   │
│   ├── clerk-auth.js
│   ├── auth.js
│   ├── api.js
│   ├── dashboard.js
│   ├── transactions.js
│   ├── budgets.js
│   ├── script.js
│   ├── style.css
│   └── variables.css
│
├── server/
│   ├── routes/
│   │   ├── transactions.js
│   │   ├── budgets.js
│   │   └── auth.js
│   ├── controllers/
│   ├── config/
│   │   └── supabaseClient.js
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── LICENSE
├── .gitignore
└── Readme.md
```

---

## Main Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Landing page with platform introduction |
| `dashboard.html` | Main financial overview and insights |
| `transactions.html` | Add, view, and manage income/expenses |
| `budgets.html` | Create and track category budgets |
| `profile.html` | User account and settings page |

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/018-alfred/Budget_tracker.git
```

### 2. Move into the project folder

```bash
cd Budget_tracker
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server/` folder with your service credentials.

Required services:

- Clerk
- Supabase

```txt
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
CLERK_SECRET_KEY=your_clerk_secret_key
PORT=5000
```

Do not commit private keys, service-role keys, or sensitive credentials into the repository.

### 5. Run the backend server

```bash
npm start
```

### 6. Open the frontend

Open the `client/index.html` file directly in a browser, or use a local development server.

Example with VS Code Live Server:

```txt
Right click client/index.html → Open with Live Server
```

---

## Repository

- **Repository:** https://github.com/018-alfred/Budget_tracker
- **Live Website:** https://budgettracker-gray.vercel.app/
- **GitHub Profile:** https://github.com/018-alfred

---

## Current Status

Budget Tracker is an actively developed personal finance platform. The project includes the core user-facing dashboard, transaction and budget management, Clerk authentication, a Node.js backend API, and Supabase database integration, with deployment live on Vercel.

---

## License

This project is licensed under the **MIT License**.

---

<div align="center">

**Budget Tracker — Track Smart. Spend Wise. Save More.**

</div>