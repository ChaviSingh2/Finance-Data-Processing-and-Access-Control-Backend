# Finance-Data-Processing-and-Access-Control-Backend
This project is a backend system for a Finance Dashboard that allows users to manage financial transactions and view summary analytics. It includes authentication, role-based access control, and data aggregation APIs.
---

Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Token (JWT)
---

Authentication

* User Registration
* User Login
* JWT-based authentication
* Protected routes using middleware

---

Role-Based Access Control

The system supports three roles:

Admin

* Full access to the system
* Can create, update, and delete transactions
* Can view all dashboard insights

---
Analyst

* Can view all transactions
* Can access dashboard insights (income, expense, balance)
* Cannot modify transactions

---
Viewer

* Can view transactions
* Limited access (read-only)
* Cannot access modification endpoints

---
Financial Transactions

Supports CRUD operations on financial records.
Fields:

* amount (Number)
* type (income / expense)
* category (String)
* note (String)
* date (Date)

---
API Endpoints
Auth Routes

* POST `/api/auth/register` → Register user
* POST `/api/auth/login` → Login and get token

---
Transaction Routes

* POST `/api/transactions` → Create transaction (Admin only)
* GET `/api/transactions` → Get all transactions (All roles)
* PUT `/api/transactions/:id` → Update transaction (Admin only)
* DELETE `/api/transactions/:id` → Delete transaction (Admin only)

---
Dashboard Routes

* GET `/api/dashboard/summary` → Get total income, expense, and balance (Admin, Analyst)

---
Example Dashboard Response

```json
{
  "totalIncome": 25000,
  "totalExpense": 2000,
  "netBalance": 23000
}
```

---
Authorization Header

All protected routes require:

```
Authorization: Bearer <your_token>
```

---
Setup Instructions
1. Clone Repository

```
git clone <your-repo-link>
cd finance-dashboard-backend
```

---
2. Install Dependencies

```
npm install
```

---
3. Create `.env` File

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecret
```

---
4. Run Server

```
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---
Testing

Tested using Thunder Client:

* Authentication flow
* Role-based access control
* CRUD operations
* Dashboard aggregation
* Error handling

---
Error Handling

Handles:

* Invalid token
* Unauthorized access
* Missing required fields
* Server errors

---
Assumptions

* Roles are assigned manually in the database
* JWT is used for authentication
* Basic validation handled via Mongoose

---
Future Improvements

* Pagination for transactions
* Filtering by date/category
* Category-wise analytics
* Unit and integration tests
* API documentation (Swagger)

---
Author

**Chavi Singh**

---
Submission Note

This project was built as part of a backend assignment to demonstrate backend architecture, API design, and access control logic.

---

