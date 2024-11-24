# Stationary Product Management API

This is a REST API built using Express.js that manages products and orders. It supports functionalities such as creating, updating, retrieving, and deleting products, as well as creating orders and calculating revenue from orders. The API uses MongoDB with Mongoose for data storage.

## Features

- **Product Management:**

  - Create a new product.
  - Retrieve all products.
  - Retrieve a product by ID.
  - Update a product by ID.
  - Delete a product by ID.

- **Order Management:**
  - Create a new order.
  - Retrieve total revenue from orders.

## Technologies Used

- TypeScript
- Node.js
- Express.js
- MongoDB (Mongoose)
- Zod (for validation)

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <project-directory>

   ```

2. **Install The Dependencies**:
   ```bash
   npm install
   npm run dev
   ```

## API Endpoints

### Product Endpoints

### **1. Create a Stationery Product**

- **Endpoint:** **`/api/products`**
- **Method:** `POST`
- **Request Body:**

```json
{
  "name": "Notebook",
  "brand": "Moleskine",
  "price": 15,
  "category": "Office Supplies",
  "description": "A high-quality notebook for professionals.",
  "quantity": 200,
  "inStock": true
}
```

- **Response:** Success message and created product details.

```jsx
{
  "message": "Product created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}

```

---
