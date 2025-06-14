## 🌐 Live Demo

- 🔗 Frontend: (https://hire-smart-frontend.vercel.app/)

# 🛠️ Hire-Smart

A **scalable full-stack labor marketplace** built with the **MERN stack**. This platform enables seamless interaction between clients and freelancers through secure authentication, a responsive UI, and real-time functionality.

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (RBAC)
  - Secure user sessions

- 🧱 **Modular Backend (Node.js + Express.js)**
  - RESTful API architecture
  - Scalable and maintainable codebase
  - MongoDB for document-based data storage

- 🎨 **Frontend (React.js + TailwindCSS)**
  - Responsive and accessible UI with TailwindCSS
  - Animations via Framer Motion
  - Embla Carousel integration for interactive sliders
  - Radix UI components for accessibility
  - Global state management using Redux Toolkit

- 💳 **Third-Party Integrations**
  - **Stripe** for secure payment processing
  - **Cloudinary** for efficient image/media uploads

- 🚀 **CI/CD & Deployment**
  - Frontend deployed on **Vercel**
  - Backend deployed on **Railway**
  - Automatic deployments with GitHub integration

## 📸 Screenshots

> _(Add screenshots/gifs of the platform here for better presentation.)_

## 🧑‍💻 Tech Stack

| Frontend         | Backend             | DevOps & Infra       | Third-Party Services     |
|------------------|---------------------|-----------------------|---------------------------|
| React.js         | Node.js             | Vercel (frontend)     | Stripe (Payments)         |
| TailwindCSS      | Express.js          | Railway (backend)     | Cloudinary (Media Uploads)|
| Framer Motion    | MongoDB             | GitHub Actions (CI/CD)|                           |
| Redux Toolkit    | JWT, RBAC           |                       |                           |
| Radix UI         | RESTful API         |                       |                           |

## 📂 Folder Structure (Simplified)

```
/client       → React frontend (Tailwind, Framer Motion, etc.)
/server       → Node.js + Express backend
.env          → Environment variables (JWT secret, API keys, etc.)
```

## 🚧 Setup & Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/labor-marketplace.git
   cd labor-marketplace
   ```

2. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Set environment variables**
   - Create `.env` files in both `client/` and `server/` folders
   - Add variables such as:
     ```
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_key
     CLOUDINARY_URL=your_cloudinary_url
     ```

4. **Run the development servers**
   ```bash
   # In one terminal
   cd client && npm run dev

   # In another terminal
   cd server && npm run dev
   ```

## ✅ To-Do / Roadmap

- [ ] Admin dashboard
- [ ] Chat system (WebSocket integration)
- [ ] Reviews & Ratings
- [ ] Mobile responsiveness optimizations

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

