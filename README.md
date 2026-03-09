# 📱 PocketTrack

![PocketTrack Banner](https://via.placeholder.com/1200x400/0f172a/38bdf8?text=PocketTrack+-+Smart+Finance+Tracking)

> A modern, AI-powered personal finance and budget tracking application built with React, Supabase, and Gemini.

PocketTrack helps you take control of your financial life. Track your daily expenses, monitor your budgets, get AI-driven insights on your spending habits, and visualize your financial health with beautiful, interactive charts.

---

## ✨ Features

- **📊 Comprehensive Dashboard**: Get a bird's-eye view of your financial status, recent transactions, and spending summaries.
- **💸 Transaction Management**: Easily add, edit, categorize, and delete your income and expenses.
- **📈 Advanced Reports & Analytics**: Visualize your spending trends with interactive charts (powered by Recharts).
- **🎯 Smart Budgeting**: Set and monitor monthly budgets across different categories.
- **🤖 AI Financial Insights**: Leverage Google Gemini AI to analyze your spending behavior and provide personalized financial tips.
- **🔐 Secure Authentication**: Safe and reliable user authentication powered by Supabase.
- **☁️ Cloud Sync**: All your financial data is securely stored and instantly synced across your devices.

## 🛠️ Tech Stack

- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling & UI**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) (Icons)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **AI Integration**: [Google Gemini GenAI](https://ai.google.dev/)
- **Data Visualization**: [Recharts](https://recharts.org/)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sohampatil00/pockettrack.git
   cd pockettrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add the following required environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```
   *(Note: You will need to create a project on Supabase and obtain a Gemini API key from Google AI Studio.)*

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Visit `http://localhost:5173` in your browser.

---

## 📂 Project Structure

```text
src/
├── assets/        # Static assets (images, logos)
├── components/    # Reusable UI components (layout, auth, common)
├── context/       # Global React context (Theme, App, Auth)
├── lib/           # Third-party library integrations (Supabase)
├── pages/         # Route level components (Dashboard, Transactions, etc.)
├── services/      # API and backend service interactions
├── types/         # TypeScript interface definitions
├── utils/         # Helper utility functions
├── App.tsx        # Main Application component & Routing
└── main.tsx       # Application entry point
```

## 📜 License

This project is licensed under the MIT License. Feel free to use and modify it for your own needs.

---
*Built with ❤️ for better financial health.*
