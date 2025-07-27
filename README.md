# 🍬 Sweet Shop Management System 🛍️

## 🌟 Overview
A full-stack Sweet Shop Management System built with a RESTful backend API and a modern single-page frontend application. The system allows users to browse, search, and purchase sweets, while admin users can manage the inventory.

## ✨ Features

### 🔙 Backend API
- 🔐 User authentication (register/login) with JWT
- � Sweet management (CRUD operations)
- 📦 Inventory management (purchase/restock)
- 🔍 Search functionality

### 🖥️ Frontend Application
- 👤 User registration and login
- 🍭 Sweet catalog browsing
- 🔎 Search and filter functionality
- 🛒 Purchase system with inventory validation
- 👔 Admin dashboard for inventory management

## 🛠️ Technologies Used

### ⚙️ Backend
- 🟢 Node.js with Express
- 🐘 PostgreSQL database
- 🔑 JWT for authentication

### 🎨 Frontend
- ⚛️ React.js
- 🎨 Tailwind CSS for styling
- 📡 Axios for API calls

## 🚀 Setup Instructions

### 📋 Prerequisites
- 🟢 Node.js (v18 or higher)
- 🐘 PostgreSQL (v12 or higher)
- 📦 npm or yarn

### ⚙️ Backend Setup
1. 📥 Clone the repository
2. 📂 Navigate to the backend directory: `cd backend`
3. ⬇️ Install dependencies: `npm install`
4. 📄 Create a `.env` file based on `.env.example`
5. 🗃️ Set up your PostgreSQL database and update the connection string in `.env`
6. 🏃 Run migrations: `npm run migrate`
7. 🚀 Start the server: `npm start`

### 🎨 Frontend Setup
1. 📂 Navigate to the frontend directory: `cd frontend`
2. ⬇️ Install dependencies: `npm install`
3. 🖥️ Start the development server: `npm run dev`

## 🔌 API Endpoints

### 🔐 Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login an existing user

### � Sweets (Protected)
- `POST /api/sweets` - Add a new sweet (Admin only)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `PUT /api/sweets/:id` - Update a sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete a sweet (Admin only)

### 📦 Inventory (Protected)
- `POST /api/sweets/:id/purchase` - Purchase a sweet
- `POST /api/sweets/:id/restock` - Restock a sweet (Admin only)

## 🤖 My AI Usage

### 🧠 AI Tools Used
- 🤖 GitHub Copilot
- 💬 ChatGPT
- 🦙 Claude AI

### 🔧 How AI Was Used
1. **GitHub Copilot**:
   - 🏗️ Used extensively for boilerplate code generation
   - 🧩 Helped with React component scaffolding
   - 🔁 Assisted with repetitive code patterns

2. **ChatGPT**:
   - 🧠 Brainstormed API endpoint structures
   - 🧪 Generated initial test cases for TDD approach
   - 🐛 Helped debug complex React state issues

3. **Claude AI**:
   - 🗄️ Assisted with database schema design
   - ❗ Provided suggestions for error handling
   - ⚡ Helped optimize SQL queries

### 💡 Impact on Workflow
The AI tools significantly accelerated development:
- ⏱️ Reduced boilerplate time
- 💭 Provided instant feedback
- 🔄 Offered alternative solutions
- 🧪 Generated comprehensive tests

All AI-generated code was carefully reviewed and modified. The AI acted as an assistant, not a replacement for critical thinking.
