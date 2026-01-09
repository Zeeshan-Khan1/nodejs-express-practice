# Project Management & Task Tracking System

A full-stack **CRUD-based Project Management & Task Tracking System** built using **Node.js, Express, MongoDB, and Vite (Frontend)**.  
This project focuses on managing projects, tasks, and team members within a software team **without authentication**, keeping the main emphasis on **CRUD operations and backend logic**.

---

## Features

### Project Management
- Create, read, update, and delete projects
- Assign a Project Manager to each project
- Track project timelines

### Task Management
- Full CRUD operations for tasks
- Assign a task to **multiple team members**
- Task status tracking:
  - To Do
  - In Progress
  - Completed

### Team Members & Roles
- CRUD operations for team members
- User roles:
  - Admin
  - Project Manager
  - Developer
- Roles are used for **categorization only**, not access control

### 🖼 Profile Picture Upload (Cloudinary Integration)
- Profile images for:
  - Admin
  - Project Manager
  - Developer
- Images are uploaded and stored securely on **Cloudinary**
- Cloudinary image URLs are saved in MongoDB

### Dashboard
- Unified dashboard (single page)
- Displays:
  - Total projects
  - Total tasks
  - Tasks by status
  - Tasks per project
  - Tasks assigned to each team member
  - Tasks grouped by role

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Cloudinary
- Multer
- dotenv

### Frontend
- Vite
- JavaScript
- HTML
- CSS

### Tools
- npm
- Nodemon
- VS Code

---

## Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/Zeeshan-Khan1/Project-Management-Task-Tracking-System.git
cd Project-Management-Task-Tracking-System
```
### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
### Backend Setup
```bash
cd backend
npm install
npm start
```

