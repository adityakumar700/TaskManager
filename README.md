Overview
A full-stack Task Manager web application that allows users to:

Create accounts and log in securely

Add, view, and manage tasks

Organize tasks by status (To Do, In Progress, Done)

Update task status via drag-and-drop interface

Features
User Authentication
Secure JWT-based authentication

Password hashing with bcrypt

Protected routes

Task Management
Create tasks with titles

Drag-and-drop status updates

Tasks organized in columns by status

Responsive design

Technical Highlights

PostgreSQL database with Sequelize ORM

RESTful API backend

React frontend with Material-UI

JWT authentication flow

Technologies Used
Frontend
React.js

Material-UI (MUI)

Axios for API calls

React Router for navigation

Backend
Node.js

Express.js

Sequelize ORM

PostgreSQL database

JWT for authentication

Bcrypt for password hashing

Installation
Prerequisites
Node.js (v14 or higher)

PostgreSQL (v12 or higher)

npm


API Endpoints
Authentication
POST /api/auth/signup - User registration

POST /api/auth/login - User login

Tasks
GET /api/tasks - Get all tasks for authenticated user

POST /api/tasks - Create a new task

PUT /api/tasks/:id - Update task status