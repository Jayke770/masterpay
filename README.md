# MasterPay

A modern, monorepo-based payment processing platform built with Turborepo, featuring a blockchain payment API server and Next.js web applications.

## 🚀 Overview

MasterPay is a full-stack payment solution that leverages blockchain technology to facilitate secure cryptocurrency payments. The project uses a monorepo architecture to manage multiple applications and shared packages efficiently.

## 📦 Project Structure

```
masterpay/
├── apps/
│   ├── server/          # Payment API server (Elysia.js)
│   ├── web/             # Main web application (Next.js)
│   └── docs/            # Documentation site (Next.js)
├── packages/
│   ├── ui/              # Shared UI components
│   ├── eslint-config/   # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
```

## 🛠️ Tech Stack

### Backend (Server)
- **Framework**: [Elysia.js](https://elysiajs.com/) - Fast and lightweight web framework
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Blockchain**: [viem](https://viem.sh/) for Ethereum interactions
- **Payment Protocol**: x402 for cryptocurrency payments
- **API Documentation**: OpenAPI/Swagger integration
- **Runtime**: Bun

### Frontend (Web & Docs)
- **Framework**: [Next.js 16](https://nextjs.org/) with React 19
- **TypeScript**: Full type safety across the codebase
- **Styling**: CSS Modules

### Monorepo Management
- **Build System**: [Turborepo](https://turbo.build/) for fast, efficient builds
- **Package Manager**: Bun 1.3.0
- **Workspaces**: npm workspaces for package management

## 📋 Prerequisites

- Node.js >= 18
- Bun 1.3.0 or higher
- PostgreSQL database

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd masterpay
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
# In apps/server/.env
DATABASE_URL=postgresql://user:password@localhost:5432/masterpay
NODE_ENV=development
PORT=3001
```

4. Run database migrations:
```bash
cd apps/server
bun run drizzle-kit push
```

## 🚀 Development

### Run all applications
```bash
bun run dev
```

### Run specific applications
```bash
# Server API
cd apps/server
bun run dev

# Web application
cd apps/web
bun run dev

# Documentation
cd apps/docs
bun run dev
```

### Available Scripts

- `bun run dev` - Start all applications in development mode
- `bun run build` - Build all applications
- `bun run lint` - Lint all packages
- `bun run format` - Format code with Prettier
- `bun run check-types` - Type check all packages

## 📡 API Server

The payment API server is built with Elysia.js and provides:

- **Payment Processing**: Create and manage cryptocurrency payments
- **Multi-Network Support**: Support for multiple blockchain networks
- **OpenAPI Documentation**: Auto-generated API documentation (available in development mode)
- **Database Persistence**: PostgreSQL with Drizzle ORM

### Key Features:
- RESTful API design
- Automatic route loading
- Type-safe database schemas
- Health check endpoints
- OpenAPI/Swagger documentation at `/swagger`

### Database Schema:
- **Payments Table**: Stores payment transactions with amount, asset address, recipient, and network information

## 🌐 Web Applications

### Web App (Port 3000)
Main user-facing application for interacting with the payment platform.

### Docs App
Documentation and guides for using the MasterPay platform.

## 📦 Shared Packages

### @repo/ui
Reusable React components:
- `Button` - Customizable button component
- `Card` - Card container component
- `Code` - Code display component

### @repo/eslint-config
Shared ESLint configurations:
- `base` - Base configuration
- `next` - Next.js specific rules
- `react-internal` - React internal package rules

### @repo/typescript-config
Shared TypeScript configurations:
- `base.json` - Base TypeScript config
- `nextjs.json` - Next.js optimized config
- `react-library.json` - React library config

## 🔐 Environment Variables

### Server (`apps/server/.env`)
```env
DATABASE_URL=postgresql://...
NODE_ENV=development
PORT=3001
```

## 🏗️ Building for Production

```bash
bun run build
```

This will build all applications and packages in the correct order using Turborepo's dependency graph.

## 📝 API Documentation

When running the server in development mode, OpenAPI documentation is available at:
```
http://localhost:3001/swagger
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run type checks and linting: `bun run check-types && bun run lint`
4. Submit a pull request

## 📄 License

[Add your license information here]

## 🔗 Links

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Elysia.js Documentation](https://elysiajs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [viem Documentation](https://viem.sh/)
