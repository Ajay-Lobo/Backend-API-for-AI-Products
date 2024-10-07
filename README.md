# API-FOR-AI-PRODUCTS

## Overview
This project is a backend API built with Node.js and Express, using MongoDB as the database. It provides endpoints for managing users, financial records, enrollments, children, caregivers, and attendance. JWT authentication is used to secure the API, and middleware like Helmet ensures basic security measures.

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Financial Records Endpoints](#financial-records-endpoints)
  - [Enrollment Endpoints](#enrollment-endpoints)
  - [Children Endpoints](#children-endpoints)
  - [Caregiver Endpoints](#caregiver-endpoints)
  - [Attendance Endpoints](#attendance-endpoints)
- [Status Codes](#status-codes)
- [Prerequisites](#prerequisites)
- [Running the Application Locally](#running-the-application-locally)
- [Contact](#contact)

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Security**: Helmet
- **Middleware**: body-parser, CORS

## Architecture
The project follows the MVC architecture with the following structure:

```bash
.
├── src
│   ├── controllers       # Handles business logic
│   ├── middleware        # Custom middleware (e.g., authentication)
│   ├── models            # Mongoose schemas for MongoDB
│   ├── routes            # API route handlers
│   ├── config            # Database and environment configurations
│   ├── app.js            # Express application setup
│   ├── server.js         # Application entry point
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
└── README.md             # Documentation for the project
```

## Features

- **User Authentication & Authorization**: Users can register and login using JWT-based authentication. Access to protected routes requires a valid token.
- **CRUD Operations**: Supports full CRUD operations for users, caregivers, and financial records.
- **Attendance Validation**:
  - Attendance cannot be recorded for inactive children.
  - Attendance can only be recorded once per day for each child. Further changes to attendance can only be made via updates.
- **Enrollment Management**:
  - Enrollment records can only be created once per month for each user.
  - After the initial creation of the enrollment for the month, only updates can be made to the record.
- **Secure Headers**: Utilizes `helmet` middleware to set various HTTP headers for security enhancement.
- **Token-Based Authentication**: API endpoints are protected by token-based authentication using the `verifyToken` middleware, ensuring secure access to resources.

## API Endpoints

### User Endpoints

| Method | Endpoint          | Description                  | Authentication Required |
|--------|-------------------|------------------------------|-------------------------|
| POST   | `/api/users/register` | Register a new user            | No                      |
| POST   | `/api/users/login`    | User login and token generation | No                      |

### Financial Records Endpoints

| Method | Endpoint                      | Description                                  | Authentication Required |
|--------|-------------------------------|----------------------------------------------|-------------------------|
| POST   | `/api/finance/`       | Create a new financial record                | Yes                     |
| GET    | `/api/finance/`       | Get all financial records                    | Yes                     |
| PUT    | `/api/finance/:id`   | Update a financial record by ID              | Yes                     |
| DELETE | `/api/finance/:id`   | Delete a financial record by ID              | Yes                     |
| GET    | `/api/finance/overview` | Get financial overview                      | Yes                     |

### Enrollment Endpoints

| Method | Endpoint                         | Description                                       | Authentication Required |
|--------|----------------------------------|---------------------------------------------------|-------------------------|
| POST   | `/api/enrollments`               | Create or update an enrollment record (once a month) | Yes                     |
| GET    | `/api/enrollments/monthly`       | Get the monthly enrollments                       | Yes                     |

### Children Endpoints

| Method | Endpoint                         | Description                                  | Authentication Required |
|--------|----------------------------------|----------------------------------------------|-------------------------|
| POST   | `/api/children`                  | Create a new child record                    | Yes                     |
| GET    | `/api/children`                  | Get all children                             | Yes                     |
| PUT    | `/api/children/:id`              | Update a child by ID                         | Yes                     |
| DELETE | `/api/children/:id`              | Delete a child by ID                         | Yes                     |
| GET    | `/api/children/overview`         | Get children overview                        | Yes                     |

### Caregiver Endpoints

| Method | Endpoint                         | Description                                  | Authentication Required |
|--------|----------------------------------|----------------------------------------------|-------------------------|
| POST   | `/api/caregivers`                | Create a new caregiver                       | Yes                     |
| GET    | `/api/caregivers`                | Get all caregivers                           | Yes                     |
| PUT    | `/api/caregivers/:id`            | Update a caregiver by ID                     | Yes                     |
| DELETE | `/api/caregivers/:id`            | Delete a caregiver by ID                     | Yes                     |
| GET    | `/api/caregivers/overview`       | Get caregivers overview                      | Yes                     |

### Attendance Endpoints

| Method | Endpoint                         | Description                                                | Authentication Required |
|--------|----------------------------------|------------------------------------------------------------|-------------------------|
| POST   | `/api/attendance`                | Record attendance for a child (only once per day, for active children) | Yes                     |
| GET    | `/api/attendance`                | Get all attendance metrics                                  | Yes                     |
| PUT    | `/api/attendance/:id`            | Update attendance record by ID                              | Yes                     |

---

### Status Codes:
- `200`: OK (Request successful)
- `201`: Created (Resource successfully created)
- `400`: Bad Request (Validation errors)
- `401`: Unauthorized (Authentication failure)
- `403`: Forbidden (Permission denied)
- `404`: Not Found (Resource not found)
- `500`: Internal Server Error (Server-side failure)

---
## Prerequisites

Before running the application, ensure you have the following installed:

1. **Node.js** (v14.x or later):
   - Install Node.js from the official website: [Node.js](https://nodejs.org/)
   - Verify installation by running:
     ```bash
     node -v
     npm -v
     ```

2. **MongoDB**:
   - Install MongoDB locally or use a cloud-based MongoDB instance (e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).
   - Ensure MongoDB is running:
     - For local MongoDB, you can start it with:
       ```bash
       mongod
       ```

3. **Git**:
   - Git is required to clone the repository. Install it from [Git](https://git-scm.com/).
   - Verify installation by running:
     ```bash
     git --version
     ```

4. **Postman or any API client** (Optional but recommended):
   - Use [Postman](https://www.postman.com/downloads/) or another API testing tool to interact with your API during development and testing.

## Running the Application Locally

Follow these steps to get the application up and running on your local machine:

### 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/yourusername/your-repository-name.git
```

### 2. Navigate into the Project Directory

```bash
cd your-repository-name
```
### 3. Install Dependencies
Once you're inside the project directory, install the necessary dependencies using npm:

```bash
npm install
```
### 4. Set Up Environment Variables
Create a .env file in the root of the project and add your environment variables:

```bash
touch .env
```
Populate the .env file with the necessary values. For example:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

### 5. Start the Application

Once MongoDB is running and the environment variables are set, start the application with the following command:

```bash
npm run dev
```

### 6. Test the API Endpoints
You can use Postman or any API client to interact with the API. Make requests to the endpoints defined in the API Endpoints section of this documentation.

## Contact
If you have any questions or suggestions, feel free to reach out to me:

- **Name**: Ajay Nishanth Lobo
- **Email**: nishanthajay1101.com
- **Contact**: 8861913538
- **GitHub**: [Ajay-Lobo](https://github.com/Ajay-Lobo)

