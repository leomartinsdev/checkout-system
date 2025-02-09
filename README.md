# Checkout API

A Node.js/Express API that implements a checkout system with special pricing rules and product management.

PS: In the challenge requirements file, it was stated that the promotions on Alexa Speakers should be applied if the user scanned MORE than 3 Alexa Speakers, but on the example given the discount was already applied when the user scanned 3 (and not more than 3) of them. I decided to follow with what was stated in the text and apply the promotion if the number of Alexa Speakers scanned were higher than 3.

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

## Available Products

| Product Name      | SKU    | Price (USD) |
|------------------|--------|-------------|
| MacBook Pro      | 43N23P | 5399.99    |
| Google Home      | 120P90 | 49.99      |
| Alexa Speaker    | A304SD | 109.50     |
| Raspberry Pi B   | 344222 | 30.00      |


## Prerequisites

- Node.js 16.x
- MySQL 8.0
- Docker and Docker Compose (optional)

## Installation and execution
- Clone the repository
- Run: npm install
- Run: npm run docker (the scripts will run everything else). The scripts will take 5-10 seconds to run and then the API will be available for requests. You can check the Docker API Container logs with the command: docker logs checkout_api -f

- To actually use the API you can send requests using Postman or Insomnia to http://localhost:3001/checkout

## Database information if you need it for any reasons:
- DB_USER=root
- DB_PASSWORD=password
- DB_NAME=CheckoutDatabase
- DB_HOST=localhost
- DB_PORT=3306

## Tests
- Run all tests: npm run test
- Run unit tests: npm run test:unit
- Run integration tests: npm run test:integration


## API Documentation

### Checkout Endpoint

#### `POST /checkout`
Calculate total price for items with applicable discounts. You can send the SKUs or the name of the products.

**Request Body:**
```json
{
  "items": ["MacBook Pro", "344222"]
}
```

**Response:**
```json
{
    "scannedItems": [
        {
            "id": 2,
            "sku": "43N23P",
            "name": "MacBook Pro",
            "price": "5399.99"
        },
        {
            "id": 4,
            "sku": "344222",
            "name": "Raspberry Pi B",
            "price": "30.00"
        }
    ],
    "total": 5399.99
}
