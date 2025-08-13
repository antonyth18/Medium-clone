# Medium Clone - Full Stack Blogging Platform

A **full-stack blogging application** inspired by Medium, built with **Hono**, **Prisma Accelerate**, **React**, **TypeScript**, and **TailwindCSS**.  
Users can **sign up**, **sign in**, **publish blogs**, and **read posts** — all secured with JWT-based authentication.

---

## Features

- **User Authentication** – Signup & Signin with JWT
- **Blog Management** – Create, Read, and Update blogs
- **Protected Routes** – Middleware-based authentication
- **Type-safe Validation** – Using `zod`
- **Responsive UI** – Mobile & desktop friendly
- **Optimized Database** – Prisma Accelerate for fast queries

---

## Tech Stack

**Backend**
- [Hono](https://hono.dev/) – Lightweight & fast web framework
- [Prisma](https://www.prisma.io/) + [Accelerate](https://www.prisma.io/accelerate) – Database ORM with edge support
- [Zod](https://zod.dev/) – Runtime validation
- [JWT](https://jwt.io/) – Authentication

**Frontend**
- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) – Fast bundler
- [TailwindCSS](https://tailwindcss.com/) – Styling
- [Axios](https://axios-http.com/) – API requests
- [React Router](https://reactrouter.com/) – Routing

---

## Folder Structure

.
├── backend
│ ├── routes/
│ │ ├── user.ts # Auth routes
│ │ └── blog.ts # Blog routes
│ ├── index.ts # Entry point
│ └── prisma schema

├── frontend
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components
│ ├── hooks/ # Custom React hooks
│ └── App.tsx

├── common
│ └── validation schemas (Zod)

yaml
Copy code

---

## Setup & Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/medium-clone.git
cd medium-clone
Install Dependencies
Backend

bash
Copy code
cd backend
npm install
Frontend

bash
Copy code
cd ../frontend
npm install
Common

bash
Copy code
cd ../common
npm install
Environment Variables
Create a .env file inside backend:

ini
Copy code
DATABASE_URL=your_database_connection_url
JWT_SECRET=your_secret_key
Run the Application
Backend

bash
Copy code
cd backend
npm run dev
Frontend

bash
Copy code
cd ../frontend
npm run dev
API Endpoints
Auth
Method	Endpoint	Description
POST	/api/v1/user/signup	Create new account
POST	/api/v1/user/signin	Login & get JWT token

Blogs
Method	Endpoint	Description
POST	/api/v1/blog	Create blog (Auth required)
PUT	/api/v1/blog	Update blog (Auth required)
GET	/api/v1/blog/bulk	Get all blogs
GET	/api/v1/blog/:id	Get single blog by ID
