# Full Stack Authentication Application

This repository contains a full-stack application for user authentication, built as part of a technical test task. It includes a frontend developed with React and TypeScript, and a backend using NestJS with MongoDB. The application supports user signup, signin, and a protected welcome page, adhering to industry best practices for security, code quality, and maintainability.

## Features

- **User Signup**: Form with email, name, and password fields, including validations (email format, name min 3 chars, password min 8 chars with at least one letter, number, and special character).
- **User Signin**: Form with email and password fields.
- **Protected Welcome page**: Displays a welcome message and includes a logout button.
- **Backend Endpoints**: Secure API for signup, signin, and a protected endpoint.
- **Security Best Practices**: Password hashing, JWT authentication, input validation, and error handling.
- **Logging**: Integrated logging on the backend for monitoring and debugging.
- **API Documentation**: Basic endpoint descriptions; a Postman collection is included for testing.
- **Docker Support**: Easy setup with Docker Compose for development and production environments.

## Tech Stack

- **Frontend**: React, TypeScript,Tailwind for styling.
- **Backend**: NestJS, MongoDB (with Mongoose ORM), JWT for authentication.
- **Database**: MongoDB.
- **Containerization**: Docker and Docker Compose.
- **Other**: Logging with custom logging middleware, API documentation via postman along with examples of requests and responses.

## Prerequisites

- Docker installed on your machine (for easy setup).
- Node.js (v18+) and npm/yarn (if running without Docker).

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/AbdulRahman-Sharief/Easygenerator-Fullstack-Task.git
   cd Easygenerator-Fullstack-Task
   ```

2. Change .env.example to .env

3. Use Docker Compose to build and run the application:

   ```
   docker compose up --build
   ```

   This will start the frontend, backend, and MongoDB services. The frontend will be available at `http://localhost:3000`, and the backend API at `http://localhost:3001`.

   Note: The first build may take a few minutes. Subsequent runs will be faster.

Docker is optimized for production environment. If you prefer to run without Docker in development mode:

- **Backend**:

  1. Navigate to `/backend`.
  2. Install dependencies: `npm install`.
  3. Set environment variables exactly like the .env.example file.
  4. Run: `npm run start:dev`.

- **Frontend**:
  1. Navigate to `/frontend`.
  2. Install dependencies: `npm install`.
  3. Run: `npm start`.

Ensure MongoDB is running locally or via Docker.

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Navigate to `/signup` to create a new account.
3. Use `/signin` to log in.
4. Upon successful login, you'll be redirected to the welcome page with a welcome message and logout option.

## API Endpoints

The backend provides the following RESTful endpoints:

- **POST /api/v1/auth/signup**: Register a new user.

  - Body: `{ "email": "string", "name": "string", "password": "string" }`
  - Response: JWT token and user details.

- **POST /api/v1/auth/login**: Authenticate a user.

  - Body: `{ "email": "string", "password": "string" }`
  - Response: JWT token and user details.

- **GET /api/v1/user/profile**: A protected endpoint (requires JWT in Authorization header).
  - Header: `Authorization: Bearer <token>`
  - Response: `{"status": "string", "message": "profile", "user": {"name": "string", "email":"string", ...etc} }`

For detailed testing, import the provided `Easygenerator.postman_collection.json` into Postman.

## Logging

Backend logging is implemented using custom logger middleware, capturing info, error, and debug levels. Logs are output to the console and can be configured for file storage in production.

## Security

- Passwords are hashed using bcrypt.
- JWT tokens are used for session management.
- Input & Response validation and sanitization prevent common vulnerabilities (e.g., XSS, injection).
- CORS are configured for production readiness.

## Postman Collection

A Postman collection (`Easygenerator.postman_collection.json`) is included in the root directory for testing all API endpoints. Import it into Postman to get started quickly.
