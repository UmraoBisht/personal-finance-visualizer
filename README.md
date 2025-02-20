# Personal Finance Visualizer

A web application for tracking personal finances. Manage your transactions, view spending insights, and set monthly category budgets. This project uses Next.js, React, shadcn/ui, Recharts, and MongoDB with Prisma.

## Features

- **Transaction Tracking:**  
  Add, edit, and delete transactions with amount, date, description, and category.

- **Dashboard & Charts:**
  - Dashboard summary showing total expenses, category breakdown, and recent transactions.
  - Monthly expenses bar chart.
  - Category breakdown pie chart.
  - Budget vs Actual comparison chart.
- **Budgeting:**  
  Set monthly budgets per category and get spending insights.

- **Backend Integration:**  
  Persist data using MongoDB with Prisma ORM.

## Technologies

- **Frontend:** Next.js, React, shadcn/ui, Tailwind CSS, Recharts
- **Backend:** MongoDB, Prisma
- **Deployment:** Vercel / Netlify (recommended)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account (or a local MongoDB instance)
- Git

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/personal-finance-visualizer.git
   cd personal-finance-visualizer

   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   ```env
   DATABASE_URL="mongodb+srv://<db_username>:<db_password>@cluster0.xcolmec.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0"
   ```

4. **Set Up Prisma:**
   Initialize Prisma and push your schema to MongoDB:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

**Running the Project**
Start the development server:

```bash
npm run dev
```

Open your browser at http://localhost:3000 to view the app.
