Overview
This is a full-stack Sweet Shop Management System built with a RESTful backend API and a modern single-page frontend application. The system allows users to browse, search, and purchase sweets, while admin users can manage the inventory.

Features
Backend API
User authentication (register/login) with JWT

Sweet management (CRUD operations)

Inventory management (purchase/restock)

Search functionality

Frontend Application
User registration and login

Sweet catalog browsing

Search and filter functionality

Purchase system with inventory validation

Admin dashboard for inventory management

Technologies Used
Backend
Node.js with Express

PostgreSQL database

JWT for authentication

Frontend
React.js

Tailwind CSS for styling

Axios for API calls

Setup Instructions
Prerequisites
Node.js (v18 or higher)

PostgreSQL (v12 or higher)

npm or yarn

Backend Setup
Clone the repository

Navigate to the backend directory: cd backend

Install dependencies: npm install

Create a .env file based on .env.example

Set up your PostgreSQL database and update the connection string in .env

Run migrations: npm run migrate

Start the server: npm start

Frontend Setup
Navigate to the frontend directory: cd frontend

Install dependencies: npm install

Start the development server: npm run dev

API Endpoints
Auth
POST /api/auth/register - Register a new user

POST /api/auth/login - Login an existing user

Sweets (Protected)
POST /api/sweets - Add a new sweet (Admin only)

GET /api/sweets - Get all sweets

GET /api/sweets/search - Search sweets

PUT /api/sweets/:id - Update a sweet (Admin only)

DELETE /api/sweets/:id - Delete a sweet (Admin only)

Inventory (Protected)
POST /api/sweets/:id/purchase - Purchase a sweet

POST /api/sweets/:id/restock - Restock a sweet (Admin only)

Screenshots
https:///screenshots/login.png
https:///screenshots/catalog.png
https:///screenshots/admin.png

My AI Usage
AI Tools Used
GitHub Copilot

ChatGPT

Claude AI

How AI Was Used
GitHub Copilot:

Used extensively for boilerplate code generation

Helped with React component scaffolding

Assisted with repetitive code patterns in both frontend and backend

ChatGPT:

Brainstormed API endpoint structures

Generated initial test cases for TDD approach

Helped debug complex React state management issues

Claude AI:

Assisted with database schema design

Provided suggestions for error handling patterns

Helped optimize SQL queries

Impact on Workflow
The AI tools significantly accelerated the development process, particularly in:

Reducing time spent on boilerplate code

Providing instant feedback on code structure

Offering alternative solutions to problems

Generating comprehensive test cases

However, all AI-generated code was carefully reviewed and modified to fit the specific requirements of the project. The AI acted as an assistant rather than a replacement for critical thinking and problem-solving.
