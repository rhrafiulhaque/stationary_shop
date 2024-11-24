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
   git clone https://github.com/rhrafiulhaque/stationary_shop
   cd stationary_shop

   ```

2. **Install The Dependencies**:
   ```bash
   npm install
   npm run dev
   ```
   This will start the server on the specified port (default: 5000).

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

### **2. Get All Stationery Products**

- **Endpoint:** **`/api/products`**
- **Method:** `GET`
- **Response:** A list of all products with details like name, brand, price, category, etc.
- Query: A list of all products from the same category, you’ll take this as `/api/products?searchTerm=category` searchTerm can be `name`, `brand`, `category`

```jsx
{
  "message": "Products retrieved successfully",
  "status": true,
  "data": [
    {
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
    },
  ]
}

```

---

### **3. Get a Specific Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `GET`
- **Response:** The details of a specific product by ID.

```jsx
{
  "message": "Product retrieved successfully",
  "status": true,
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

### **4. Update a Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `PUT`
- **Request Body:** (Product details to update)

```json
{
  "price": 18,
  "quantity": 180
}
```

- **Response:** Success message and updated product details.

```jsx
{
  "message": "Product updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 18,  // Price updated
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 180,  // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z"  // Updated timestamp
  }
}

```

---

### **5. Delete a Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `DELETE`
- **Response:** Success message confirming the product has been deleted.

```jsx
{
  "message": "Product deleted successfully",
  "status": true,
  "data": {}
}

```

---

### **6. Order a Stationery Product**

- **Endpoint:** **`/api/orders`**
- **Method:** `POST`
- **Inventory Management Logic:**
  - When an order is placed, reduce the **quantity** in the product model.
  - If the inventory quantity goes to zero, set **inStock** to `false`.
  - Handle **insufficient stock** cases by returning an appropriate error message.
- **Request Body:**

```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 36
}
```

- **Response:** Success message confirming the order.

```jsx
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 36,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z"
  }
}

```

---

### **7. Calculate Revenue from Orders With Aggregation**

- **Endpoint:** **`/api/orders/revenue`**
- **Method:** `GET`
- **Aggregation Suggestion:**
  - Use MongoDB aggregation pipeline to calculate the total revenue from `all orders`.
  - Calculate the total price by multiplying the price of each product by the quantity ordered.
- **Response:** The total revenue from all orders.

```jsx
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 720  // Total revenue calculated from all orders
  }
}

```

---

If the Validation Error Occured And Zod Validation is -

### **Validation Errors**

This API uses Zod for validating input data. If any validation fails, the response will include details about the validation issues.

Example of a validation error response:

```jsx
{
  "message": "Validation Failed",
  "success": false,
  "errors": [
    {
      "message": "Invalid format",
      "path": ["name"],
      "expected": "string"
    }
  ]
}
```

---

## Author

**Rafiul Haque**

- Email: [rh.rafiul.haque@gmail.com](mailto:rh.rafiul.haque@gmail.com)
- Website: [https://rafiul-haque.vercel.app](https://rafiul-haque.vercel.app)
