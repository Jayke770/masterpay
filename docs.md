# MasterPay: Unified Crypto Payment Rail for EVM and Solana

## Abstract

The proliferation of blockchain technologies and cryptocurrencies has led to a growing demand for seamless, secure, and scalable payment solutions. Existing integrations with third-party providers are often fragmented, time-consuming, and limited in scope. MasterPay proposes a unified, in-house payment rail powered by the x402 protocol, supporting major EVM blockchains and Solana, and focusing on ERC20 and SPL token payments. This thesis details the motivation, design, implementation, limitations, and future directions of MasterPay.

---

## 1. Introduction

### 1.1 Background

Cryptocurrency adoption is accelerating across industries, with businesses seeking to accept digital assets for payments, subscriptions, and services. However, integrating crypto payments is challenging due to the diversity of blockchains, token standards, and third-party providers. Each provider (e.g., Thirdweb) offers different APIs, supported chains, and integration patterns, resulting in increased development time and maintenance complexity.

### 1.2 Motivation

The need for a unified, developer-friendly payment rail is clear. MasterPay aims to:

- Reduce integration time and complexity for merchants.
- Provide a consistent API across multiple blockchains.
- Support the most widely used token standards (ERC20, SPL).
- Enable rapid onboarding and reliable payment verification.

---

## 2. Problem Statement

Current crypto payment solutions suffer from:

- **Fragmentation**: Multiple providers, each with unique APIs and limitations.
- **Integration Overhead**: Significant time spent adapting to different systems.
- **Limited Coverage**: Not all blockchains or tokens are supported.
- **Inconsistent User Experience**: Varying payment flows and confirmation mechanisms.

---

## 3. Solution Overview

Ed3nPay is an in-house payment rail built on the x402 protocol, designed to support:

- All major EVM blockchains (Ethereum, Polygon, BSC, Arbitrum, Optimism, etc.)
- Solana blockchain
- ERC20 and SPL token payments

### 3.1 Key Features

- **Unified API**: One integration for all supported chains.
- **x402 Protocol**: Secure, scalable, and optimized for payment flows.
- **Multi-Chain Support**: EVM and Solana.
- **OpenAPI Documentation**: Interactive API exploration.
- **Monorepo Architecture**: Shared codebase for server, web, docs, and UI.

---

## 4. Technical Design

### 4.1 Architecture

```
masterpay/
├── apps/
│   ├── server/   # Elysia.js API server, x402 payment logic
│   ├── web/      # Next.js web app for users
│   └── docs/     # Documentation site
├── packages/
│   ├── ui/       # Shared React UI components
│   ├── eslint-config/
│   └── typescript-config/
```

### 4.2 Protocol Choice: x402

x402 is chosen for its:

- Security: Designed for cryptographic payment flows.
- Extensibility: Supports new chains and tokens.
- Developer Experience: Clear, type-safe APIs.

### 4.3 Supported Blockchains and Tokens

- **EVM**: Ethereum, Polygon, BSC, Arbitrum, Optimism, and more.
- **Solana**: SPL token support.
- **Tokens**: Only ERC20 (EVM) and SPL (Solana).

### 4.4 API Design

- **Create Payment Intent**: Initiate a payment, specifying chain, token, amount, and recipient.
- **Check Payment Status**: Query the status of a payment intent.
- **List Supported Chains/Tokens**: Discover available options.
- **Webhook for Payment Confirmation**: Notify merchant upon payment completion.

### 4.5 Database Schema

- **Payments Table**: Stores payment transactions, including amount, asset address, recipient, network, timestamps, and status.

---

## 5. Implementation

### 5.1 Server

- **Framework**: Elysia.js (TypeScript, Bun runtime)
- **Database**: PostgreSQL with Drizzle ORM
- **Blockchain Integration**: viem (EVM), x402, SPL (Solana)
- **API Documentation**: OpenAPI via @elysiajs/openapi

### 5.2 Web Application

- **Framework**: Next.js 16, React 19
- **UI**: Shared components from `@repo/ui`
- **User Flow**: Payment page with wallet connect, status updates

### 5.3 Documentation

- **Site**: Next.js app in `apps/docs`
- **Content**: Thesis-style documentation, API reference, integration guides

---

## 6. Payment Flow

1. **Merchant Integration**: Merchant integrates MasterPay API.
2. **Payment Intent Creation**: Merchant creates a payment intent via API.
3. **User Payment**: User pays using their wallet (Metamask, Phantom, etc.).
4. **On-Chain Verification**: MasterPay verifies transaction and updates status.
5. **Merchant Notification**: Webhook or polling for payment confirmation.

### Payment Flow Diagram

![x402 Protocol Payment Flow](https://raw.githubusercontent.com/coinbase/x402/refs/heads/main/static/x402-protocol-flow.png)

---

## 7. Limitations

- **Token Support**: Only ERC20 and SPL tokens.
- **No NFT Payments**: ERC721/1155/SPL NFTs not supported.
- **No Fiat On/Off Ramp**: Crypto-only payments.
- **Chain Coverage**: Limited to major EVM chains and Solana.

---

## 8. Security Considerations

- **On-Chain Verification**: All payments are verified on-chain for authenticity.
- **API Authentication**: Merchants must authenticate to create payment intents.
- **Data Integrity**: PostgreSQL and Drizzle ORM ensure reliable data storage.

---

## 9. Future Work

- **Expand Token Support**: Add NFT and other token standards.
- **Fiat Integration**: Enable fiat on/off ramps.
- **Analytics**: Provide payment analytics and reporting.
- **SDKs**: Developer SDKs for popular languages.
- **Mobile Support**: Mobile wallet integration.

---

## 10. Getting Started

### 10.1 Installation

```bash
bun install
```

### 10.2 Environment Configuration

Create `.env` in `apps/server`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/masterpay
NODE_ENV=development
PORT=3001
```

### 10.3 Running the Server

```bash
bun run dev
```

### 10.4 API Exploration

Visit `http://localhost:3001/swagger` for interactive documentation.

---

## 11. Example Integration

1. Merchant calls `POST /payments` to create a payment intent.
2. User is redirected to a payment page with wallet connect.
3. User sends ERC20/SPL token to the provided address.
4. MasterPay verifies the transaction and updates status.
5. Merchant receives webhook or polls for confirmation.

---

## 12. Contributing

- Fork the repository and create a feature branch.
- Make your changes and run type checks and linting:
  ```bash
  bun run check-types && bun run lint
  ```
- Submit a pull request.

---

## 13. License

[Specify your license here]

---

## 14. References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Elysia.js Documentation](https://elysiajs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [viem Documentation](https://viem.sh/)
- [x402 Protocol](https://github.com/x402-protocol)
