# 📚 BookNest — Book Review App

**BookNest** is a full-stack book review application built using the MERN stack. It allows readers to discover books, view book details, share reviews, rate books, and manage their own books and reviews.

## 🌐 Live Demo

- **Live Application:** https://booknest-mern-qb4q.vercel.app
- **Backend API:** https://booknest-mern-u7zt.onrender.com
- **GitHub Repository:** https://github.com/Patidarvinita08/booknest-mern

## ✨ Features

### 🔐 Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes for authenticated users

### 📖 Book Management
- Browse available books
- View book details
- Add new books
- Edit and delete your own books
- Search and filter books, if enabled in the application

### ⭐ Reviews and Ratings
- Submit ratings from 1 to 5 stars
- Write reviews for books
- Edit and delete your own reviews
- View reviews on book detail pages
- Enforce one review per user per book, where implemented
- Display average book ratings, where implemented

### 💻 User Experience
- React-based interface
- Responsive design
- Protected pages and authenticated API requests
- REST API powered by Express.js

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development and build tooling |
| Tailwind CSS | Styling and responsive layouts |
| React Router | Client-side navigation |
| Axios | HTTP requests to the backend |
| Node.js | Backend runtime |
| Express.js | REST API and server |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| bcrypt | Password hashing |
| JSON Web Tokens | Authentication |
| Vercel | Frontend deployment |
| Render | Backend deployment |
| MongoDB Atlas | Hosted database |

## 📂 Project Structure

```text
booknest-mern/
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

*The structure above is representative. Your actual source files may differ.*

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- Git
- MongoDB Atlas account or a local MongoDB instance

### 1. Clone the repository

```bash
git clone https://github.com/Patidarvinita08/booknest-mern.git
cd booknest-mern
```

### 2. Set up the backend

Open a terminal:

```bash
cd server
npm install
```

Create a `server/.env` file with these variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
CLIENT_URL=http://localhost:5173
```

Replace the placeholder values with your own credentials. Never commit real credentials or secrets to GitHub.

Start the backend using a script defined in `server/package.json`. For example, if a `dev` script exists:

```bash
npm run dev
```

### 3. Set up the frontend

Open a second terminal from the project root:

```bash
cd client
npm install
```

Create a `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`.

## 🚀 Production Deployment

### Frontend — Vercel

Live application:

https://booknest-mern-qb4q.vercel.app

Set the following environment variable in the Vercel project's Production environment:

```env
VITE_API_URL=https://booknest-mern-u7zt.onrender.com/api
```

The Vercel project root directory should be `client`.

### Backend — Render

Backend URL:

https://booknest-mern-u7zt.onrender.com

Configure the backend environment variables in Render:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
CLIENT_URL=https://booknest-mern-qb4q.vercel.app
NODE_ENV=production
```

Set `PORT` only if required by your service configuration; Render supplies its own port environment variable.

**Security:** Never put `MONGO_URI` or `JWT_SECRET` in frontend environment variables. Variables beginning with `VITE_` are exposed to the browser.

## 🔌 API Overview

The backend uses the `/api` prefix.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/books` | Retrieve books |
| GET | `/api/books/:id` | Retrieve book details |
| POST | `/api/books` | Create a book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

Book and review endpoints may require JWT authentication. Refer to the backend route files for the exact review endpoints, authorization requirements, and supported query parameters.

## 🧪 Testing

The following functionality has been manually tested on the deployed application:

- User registration and login
- Adding a book
- Opening a book detail page
- Submitting a review
- Editing and deleting owned content

Additional recommended checks include:

- My Reviews page
- Direct navigation and refreshing nested routes
- Ownership restrictions between different users
- Validation and error handling

## 🔒 Security Practices

- Store passwords as bcrypt hashes.
- Keep JWT secrets and database credentials private.
- Use protected middleware for restricted API routes.
- Check resource ownership before allowing edits or deletions.
- Keep `.env` files out of version control.
- Configure CORS to allow the deployed frontend origin.

## 🔮 Future Improvements

- Automated unit and integration tests
- Pagination for large book collections
- Improved search and filtering
- Book cover uploads
- User profiles and reading lists
- Enhanced accessibility and error handling

## 👩‍💻 Author

**Vinita Patidar**

- GitHub: https://github.com/Patidarvinita08

## 📄 License

This project was developed as an internship assignment. Add a license file if you decide to distribute it under a specific open-source license.