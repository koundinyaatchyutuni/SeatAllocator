# 📅 iScheduler

A full-stack MERN task scheduling application that enables users to efficiently organize recurring tasks, receive automated email reminders, and manage weekly schedules through a modern, responsive interface.

Designed and built to demonstrate full-stack software engineering concepts including authentication, REST APIs, recurring scheduling algorithms, secure data handling, cloud deployment, and background job processing.

---

## 🚀 Features

- 🔐 Secure User Authentication (JWT + Bcrypt)
- 📧 Email OTP Verification during registration
- 📆 Weekly Recurring Task Scheduling
- ⏰ Automated Email Reminder System
- 📝 Complete Task CRUD Operations
- 👤 User Profile Management
- 🔄 Real-time Schedule Synchronization
- ⚠️ Schedule Conflict Detection
- ☁️ Cloud Deployment using Render
- 🗄️ MongoDB Atlas Integration
- 📱 Responsive Modern UI

---

# 💡 Motivation

Managing recurring daily tasks manually is often inefficient and reminders are scattered across multiple applications.

The objective of iScheduler is to provide users with a single platform where they can

- Schedule recurring tasks
- Organize weekly activities
- Receive automatic reminder emails
- Manage personal schedules securely
- View schedules in an intuitive timeline

Unlike traditional to-do applications, iScheduler focuses on recurring weekly planning together with automated notifications.

---

# 🏗️ System Architecture

```
                    +----------------------+
                    |     React (Vite)     |
                    |     Frontend UI      |
                    +----------+-----------+
                               |
                         Axios REST APIs
                               |
                               ▼
                    +----------------------+
                    |   Express.js Server  |
                    | Authentication APIs  |
                    |  Task Management     |
                    | User Management      |
                    +----------+-----------+
                               |
                -------------------------------
                |                             |
                ▼                             ▼
         MongoDB Atlas               Nodemailer
      User & Task Storage         Email Notifications
                |
                ▼
      Background Scheduler
     (Reminder Processing Engine)
                |
                ▼
     Automated Reminder Emails
```

---

# ⚙️ Tech Stack

| Technology | Purpose |
|------------|----------|
| React.js | Component-based frontend |
| Vite | Fast development and optimized builds |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| JWT | User authentication |
| Bcrypt | Password hashing |
| Nodemailer | Email notifications |
| Axios | Frontend-backend communication |
| Render | Cloud deployment |

---

# 🤔 Why These Technologies?

## React.js

- Reusable component architecture
- Efficient state management
- Fast UI rendering
- Large ecosystem

---

## Vite

Chosen instead of Create React App because it provides

- Lightning-fast startup
- Instant Hot Module Replacement
- Optimized production builds

---

## Node.js + Express.js

Perfect for asynchronous applications.

Allows handling

- Authentication
- CRUD APIs
- Email services
- Scheduling logic

using a single JavaScript ecosystem.

---

## MongoDB

The application stores flexible user schedules.

MongoDB's document model makes storing

- Users
- Weekly schedules
- Tasks
- Reminder metadata

much simpler than relational databases.

---

## JWT Authentication

Used for

- Stateless authentication
- Secure login sessions
- Protected API access

---

## Bcrypt

Passwords are never stored in plain text.

Every password is securely hashed before being stored in MongoDB.

---

## Nodemailer

Provides automatic email notifications for scheduled reminders and OTP verification.

---

## Render

Provides easy deployment for

- Frontend
- Backend

along with automatic GitHub deployments.

---

# 📂 Project Structure

```
iScheduler
│
├── src/
│   ├── Components/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── models/
│
├── utils/
│
├── server.js
│
├── reminder.js
│
├── package.json
│
└── README.md
```

---

# 🔄 Application Workflow

## User Registration

```
User
   │
   ▼
Signup Form
   │
   ▼
OTP Verification
   │
   ▼
Password Hashing
   │
   ▼
MongoDB
```

---

## Login

```
User
   │
   ▼
Login API
   │
   ▼
JWT Generation
   │
   ▼
Authenticated Session
```

---

## Task Creation

```
Create Task
      │
      ▼
Validation
      │
      ▼
Conflict Detection
      │
      ▼
MongoDB Storage
```

---

## Reminder Flow

```
Daily Reminder Engine
        │
        ▼
Read Today's Tasks
        │
        ▼
Generate Reminder Jobs
        │
        ▼
Send Email Before Task Starts
```

---

# 🔐 Security

- Password hashing using Bcrypt
- JWT Authentication
- Email OTP Verification
- Environment Variables for sensitive credentials
- CORS configuration
- Encrypted storage of sensitive user information

---

# 📈 Future Improvements

- Google Calendar Integration
- Mobile Application
- Push Notifications
- SMS Reminders
- AI-based Schedule Optimization
- Voice Assistant Support
- Team Collaboration
- Calendar Sharing

---

# 🧠 Software Engineering Concepts Demonstrated

- Full Stack Development
- REST API Design
- Authentication & Authorization
- CRUD Operations
- Background Job Scheduling
- Email Services
- Cloud Deployment
- Database Design
- MVC-inspired Architecture
- Secure Password Storage
- Environment Configuration
- Client-Server Architecture
- Component-based UI Development

---

# 📸 Screenshots

> Add screenshots of

- Login Page
- Signup Page
- Dashboard
- Schedule View
- Reminder Email
- Profile Page

---

# 🚀 Deployment

Frontend:
Render Static Site

Backend:
Render Web Service

Database:
MongoDB Atlas

---

# 👨‍💻 Author

**Manikya Prasad Koundinya**

Leetcode:
https://leetcode.com/u/Koundinyaatchyutuni/

LinkedIn:
https://www.linkedin.com/in/koundinya-atchyutuni/

Email:
koundinyaatchyutuni@gmail.com
