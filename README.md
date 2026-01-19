# Camelot - Expropriation Management System

Camelot is a comprehensive **Expropriation and Land Acquisition Management System** developed for public institutions and municipalities. It provides end-to-end digital management of project processes, owner information, payment tracking, and legal proceedings.

## 🚀 Technologies

This project is built on a modern technology stack:

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router & Turbopack)
- **UI Library:** [React 19](https://react.dev/) & [Shadcn UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Package Manager:** [Bun](https://bun.sh/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** [TanStack Query v5](https://tanstack.com/query/latest)

## 📦 Project Structure

The project follows a monorepo (Turborepo) architecture:

```text
.
├── apps/
│   └── web/          # Main Next.js application
├── packages/
│   ├── ui/           # Shared UI components (Shadcn based)
│   ├── eslint-config/# Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── package.json      # Monorepo root
```

## 🛠 Setup and Initializing

**Bun** package manager is used in this project.

### Install Dependencies

```bash
bun install
```

### Start Development Server

```bash
bun run dev
```

The application will be running at `http://localhost:3000` by default.

## 🏗 Key Features

- **Project Management:** Detailed tracking of Expropriation, Easement, Allocation, and Transfer projects.
- **Owner Management:** Information on real estate owners, share ratios, and communication details.
- **Process Tracking:** Management of notification, valuation, and reconciliation processes.
- **Financial Tracking:** Payment statuses, budget analysis, and pending transactions.
- **Legal Process:** Tracking of court files, judicial decisions, and legal stages.
- **Modern UI:** Premium and responsive user interface built with Tailwind v4 and Shadcn UI.

## 🚢 Deployment

The project is configured to be automatically built and tested using GitHub Actions. See `.github/workflows/deploy.yml` for details.

---

**Developer:** SUKI General Directorate - Information Technology Department
