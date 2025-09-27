# 📝 To-Do List Application

A modern, full-stack to-do list application built with React (frontend) and Node.js/Express (backend), featuring MongoDB Atlas cloud database integration.

## ✨ Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as completed with visual feedback
- ✅ Real-time updates and data persistence
- ✅ Responsive design with Bootstrap 5
- ✅ RESTful API with proper error handling
- ✅ Cloud database integration (MongoDB Atlas)
- ✅ Pretty-print JSON API endpoint
- ✅ Hot reload for development

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)

### Installation

#### **Quick Setup (Recommended):**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Poojan2107/To-Do-List.git
   cd To-Do-List
   ```

2. **Run the setup script:**
   
   **For Windows:**
   ```bash
   setup.bat
   ```
   
   **For Mac/Linux:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

#### **Manual Setup:**

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp backend/.env.example backend/.env
   ```
   
   **Note:** The MongoDB Atlas connection string is already configured in the .env.example file and will work immediately.

3. **Start the application:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run dev:frontend` | Start only frontend |
| `npm run dev:backend` | Start only backend |
| `npm run install:all` | Install all dependencies |
| `npm run start:backend` | Start backend in production mode |

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/pretty` | Get all tasks (formatted JSON) |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/:id` | Get a specific task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## 🏗️ Project Structure

```
to-do-list/
├── 📁 backend/                 # Backend API server
│   ├── 📁 src/
│   │   ├── 📁 models/          # Database models
│   │   │   └── Task.js
│   │   ├── 📁 routes/          # API routes
│   │   │   └── tasks.js
│   │   └── server.js           # Main server file
│   ├── .env.example            # Environment variables template
│   ├── package.json
│   └── package-lock.json
├── 📁 frontend/                # React frontend
│   ├── 📁 src/
│   │   ├── App.jsx             # Main React component
│   │   └── main.jsx            # React entry point
│   ├── index.html
│   ├── styles.css              # Custom styles
│   ├── vite.config.js          # Vite configuration
│   └── package.json
├── .gitignore                  # Git ignore rules
├── package.json                # Root package.json
└── README.md                   # This file
```

## 🔧 Technology Stack

- **Frontend:** React 19, Vite, Bootstrap 5
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas (Cloud)
- **Development:** Nodemon, Concurrently

## 📝 Usage

1. **Add a task:** Enter title and optional description, click "Add Task"
2. **Edit a task:** Click the "Edit" button, modify, and save
3. **Complete a task:** Check the checkbox to mark as completed
4. **Delete a task:** Click the "Delete" button to remove permanently
5. **Refresh data:** Use the "🔄 Refresh" button to reload from database

## 🌐 Deployment

This application is ready for deployment on platforms like:
- Vercel (Frontend)
- Heroku (Backend)
- Netlify (Frontend)
- Railway (Full-stack)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

If you have any questions or need help, please open an issue in the repository.
