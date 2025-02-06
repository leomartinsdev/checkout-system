# Checkout API

A Node.js/Express API that implements a checkout system with special pricing rules and product management.

## Features

- Product management with MySQL database
- Special pricing rules:
  - Buy 3 Google Homes for the price of 2
  - Free Raspberry Pi B with every MacBook Pro purchase
  - 10% discount on Alexa Speakers when buying 3 or more
- RESTful API endpoints
- Docker containerization
- TypeScript implementation

## Tech Stack

- Node.js
- Express
- TypeScript
- MySQL
- Sequelize ORM
- Docker
- Jest (Testing)

## Prerequisites

- Node.js 16.x
- MySQL 8.0
- Docker and Docker Compose (optional)

## Installation and execution
- Clone the repository
- Run: npm install
- Run: npm run docker (the scripts will run everything else).

## Database information if you need it for any reasons:
- DB_USER=root
- DB_PASSWORD=password
- DB_NAME=CheckoutDatabase
- DB_HOST=localhost
- DB_PORT=3306


## API Documentation

### Checkout Endpoint

#### `POST /checkout`
Calculate total price for items with applicable discounts.
Example: http://localhost:3001/checkout

**Request Body:**
```json
{
  "items": ["120P90", "43N23P", "A304SD"]
}