# BlogSpace – Modern MERN Blogging Platform

A production-ready blogging platform built with the MERN stack. It includes secure authentication, rich blog authoring, comments, interactions, user profiles, and a clean, responsive UI powered by React + TailwindCSS.

![MERN](https://img.shields.io/badge/Stack-MERN-green) ![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue) ![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-orange) ![DB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## ✨ Features
- **JWT Auth**: Signup, login, protected routes, session management
- **Blog Management**: Create, edit, publish, list, and manage blogs
- **Rich Editor**: Client-side blog editor with publish workflow
- **Comments**: Add, list and manage comments per blog
- **Interactions**: Likes, bookmarks, and related interactions
- **Notifications**: Basic notification model for user events
- **Profile & Users**: User profiles, public user pages, trending sections
- **Search & Filters**: Pagination and filtering helpers
- **Responsive UI**: TailwindCSS, clean components, modern layout

## 🗂 Project Structure
```
mern-blogging-website/
├── backend/                 # Node.js/Express API
│   ├── server.js            # App entrypoint
│   ├── config/              # Config & DB
│   │   ├── constants.js
│   │   ├── database.js
│   │   └── server.js
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   ├── commentController.js
│   │   ├── interactionController.js
│   │   └── userController.js
│   ├── middleware/          # Middlewares
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/              # Mongoose models
│   │   ├── Blog.js
│   │   ├── Comment.js
│   │   ├── Notification.js
│   │   └── User.js
│   └── routes/              # Express routes
│       ├── auth.js
│       ├── blogs.js
│       ├── comments.js
│       ├── interactions.js
│       └── users.js
└── frontend/                # React + Vite client
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── common/          # Utilities & helpers
    │   │   ├── date.jsx
    │   │   ├── filter-pagination-data.jsx
    │   │   ├── page-animation.jsx
    │   │   ├── scroll-to-top.jsx
    │   │   └── session.jsx
    │   ├── components/      # UI Components
    │   │   ├── blog-editor.component.jsx
    │   │   ├── blog-post.component.jsx
    │   │   ├── blog-content.component.jsx
    │   │   ├── comments.component.jsx
    │   │   ├── comment-card.component.jsx
    │   │   ├── navbar.component.jsx
    │   │   ├── trending-blog-section.component.jsx
    │   │   └── ...
    │   └── pages/           # Pages
    │       ├── home.page.jsx
    │       ├── blog.page.jsx
    │       ├── editor.pages.jsx
    │       ├── profile.page.jsx
    │       ├── search.page.jsx
    │       └── userAuthForm.page.jsx
    ├── tailwind.config.js
    ├── vite.config.js
    └── index.html
```

## ⚙️ Tech Stack
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Auth**: JWT, bcrypt

## 🚀 Getting Started

### Backend Setup
1. Install dependencies
   ```powershell
   cd backend
   npm install
   ```
2. Create `.env` in `backend/` (example)
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blogspace
   JWT_SECRET=your-jwt-secret
   NODE_ENV=development
   ```
3. Start the server
   ```powershell
   npm start
   # or
   npx nodemon
   ```

### Frontend Setup
1. Install dependencies
   ```powershell
   cd frontend
   npm install
   ```
2. Create `.env` in `frontend/`
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```
3. Run the dev server
   ```powershell
   npm run dev
   ```

## 🔐 Authentication Flow
- Users register and login via `auth` routes.
- JWT is issued on login; protected routes enforce auth via middleware `backend/middleware/auth.js`.
- Client stores session state via `src/common/session.jsx` and guards pages where necessary.

## 📚 API Overview
Base URL: `http://localhost:5000/api`

### Auth
- `POST /api/auth/signup` – Register new user
- `POST /api/auth/login` – Login user
- `GET  /api/auth/profile` – Get current user (protected)

### Blogs
- `GET    /api/blogs` – List blogs with pagination/filtering
- `GET    /api/blogs/:id` – Get a single blog by ID/slug
- `POST   /api/blogs` – Create blog (protected)
- `PUT    /api/blogs/:id` – Update blog (protected)
- `DELETE /api/blogs/:id` – Delete blog (protected)

### Comments
- `GET    /api/comments/:blogId` – List comments for a blog
- `POST   /api/comments/:blogId` – Add comment (protected)
- `DELETE /api/comments/:commentId` – Remove comment (protected)

### Interactions
- `POST   /api/interactions/like/:blogId` – Like/unlike a blog (protected)
- `POST   /api/interactions/bookmark/:blogId` – Bookmark/unbookmark (protected)

### Users
- `GET  /api/users/:username` – Public profile
- `GET  /api/users/trending` – Trending authors/bloggers

> Note: Exact request/response shapes are defined in the respective controllers and models.

## 🧩 Frontend Highlights
- **Pages**: Home, Blog detail, Editor, Profile, Search, 404
- **Components**: Blog editor, Post card, Content renderer, Comments, Navbar, Tags, Trending section, etc.
- **Helpers**: Pagination & filter (`filter-pagination-data.jsx`), date formatting, page animations, and session handling.

## 📄 License
ISC License. See repository for details.

---

Built with ❤️ by [the-avc](https://github.com/the-avc)