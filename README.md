# 🧠 GiniBlog — AI-Powered Blogging Platform

GiniBlog is a modern, AI-powered blogging platform built with **Next.js 15**, **Clerk Authentication**, **Google Generative AI (Gemini)**, **Redux Toolkit**, and **MongoDB**. It enables users to write blogs with the help of AI, manage posts, suggest tags automatically, and interact with an elegant and responsive UI.

## Live site: 
<a href="https://giniblog-git-main-md-sufian-jidans-projects.vercel.app/">Link</a>

---

## 🚀 Features

- ✍️ Create, edit, delete, and view blog posts
- 🤖 AI-powered tag suggestions using Google Gemini API
- 🔐 Secure authentication using Clerk
- 🧠 AI-assisted writing interface
- 🧾 Categories and tagging support
- 🧑‍💻 Author profiles with images and bios
- 💬 Comment system
- 📊 Dashboard with visual analytics using Recharts
- 🎨 Fully responsive with animations (Framer Motion)
- 📚 Clean code architecture with Redux Toolkit and RTK Query
- ☁️ MongoDB integration for persistent data
- 🧼 Linted and formatted with ESLint & Prettier

---

## 🧱 Tech Stack

- **Frontend:** React 19, Next.js 15 (App Router)
- **Backend/API:** Next.js API routes + MongoDB with Mongoose
- **Auth:** Clerk.dev
- **AI Integration:** Google Generative AI (Gemini)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit, RTK Query
- **Animation:** Framer Motion
- **UI:** Lucide Icons, React Icons, Keen Slider, Swiper.js
- **Notifications:** React Hot Toast, SweetAlert2

---
```bash

git clone https://github.com/your-username/giniblog.git
cd giniblog

npm install
# or
yarn install

.env

MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_GEMINI_API_KEY=your_google_genai_api_key

npm run dev
# or
yarn dev

```
