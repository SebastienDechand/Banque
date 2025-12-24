# Bank Account API - Hexagonal Architecture

A banking application built with NestJS using **Hexagonal Architecture** (Ports & Adapters) and **Test-Driven Development** (TDD).

## Architecture

```
src/
├── domain/              # Business entities and interfaces
├── application/         # Use cases (business logic)
├── infrastructure/      # External implementations (MongoDB, in-memory, JSON)
└── presentation/        # Controllers and DTOs
```

## Features

- Create bank accounts
- Deposit money
- Withdraw money
- Check account balance
- Multiple repository implementations (MongoDB, in-memory, JSON file)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SebastienDechand/Banque.git
cd banque-nestjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

**Important**: Credentials are not stored in the repository for security reasons.

Copy the example file and set your own values:

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=your_password
MONGO_INITDB_DATABASE=banque
MONGODB_URI=mongodb://admin:your_password@localhost:27017/banque?authSource=admin
PORT=3000
```

### 4. Start MongoDB with Docker

```bash
docker-compose up -d
# or using npm script
npm run db:up
```

### 5. Run the application

```bash
# Development mode with auto-reload
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at `http://localhost:3000`

## Available Scripts

### Development

```bash
npm run start         # Start the application
npm run start:dev     # Start with auto-reload (watch mode)
npm run start:debug   # Start in debug mode
npm run build         # Build the application for production
```

### Code Quality

```bash
npm run format        # Format code with Prettier
npm run lint          # Lint and fix code with ESLint
```

### Testing

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:cov      # Generate coverage report
npm run test:debug    # Run tests in debug mode
npm run test:e2e      # Run end-to-end tests
```

## Docker Commands

Useful Docker commands for managing MongoDB:

```bash
# Start MongoDB container
npm run db:up

# Stop MongoDB container
npm run db:down

# Reset MongoDB (delete all data and restart)
npm run db:reset

# Access MongoDB shell
npm run db:shell
```

## Testing

The project follows TDD principles with comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov
```

### Test structure

```
tests/
├── unit/              # Unit tests by layer
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   └── presentation/
├── integration/       # Integration tests
├── e2e/              # End-to-end tests
└── fixtures/         # Test data builders
```

## API Endpoints

### Create Account

```bash
POST /accounts
Body: { "id": "1", "ownerName": "Alice" }
```

### Deposit Money

```bash
POST /accounts/:id/deposit
Body: { "amount": 100 }
```

### Withdraw Money

```bash
POST /accounts/:id/withdraw
Body: { "amount": 50 }
```

### Get Balance

```bash
GET /accounts/:id/balance
```

## Technology Stack

- **NestJS** - Backend framework
- **TypeScript** - Programming language
- **MongoDB** - Database
- **Docker** - Containerization
- **Jest** - Testing framework

## License

MIT
