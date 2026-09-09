# Grove & Co.

A full-stack, premium furniture & interior-goods e-commerce platform.

## Tech Stack

- **Frontend:** React (Vite), React Router, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, React Three Fiber, Zustand, TanStack Query
- **Backend:** Node.js, Express, MongoDB Atlas, Mongoose, JWT, Socket.io, Razorpay (test mode)

## Getting Started

### Prerequisites
- Node.js 18+ (LTS)
- MongoDB Atlas cluster (free tier)
- A Razorpay test-mode API key
- A Gmail account for Nodemailer dev (or Ethereal)

### 1. Clone & Install
```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Environment Variables
Copy `.env.example` files and fill in real values:
```bash
# Client
cp client/.env.example client/.env
# Server
cp server/.env.example server/.env
```

Required server env vars: `PORT`, `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `CLIENT_URL`

Required client env vars: `VITE_API_URL`, `VITE_RAZORPAY_KEY_ID`

### 3. Run Dev Servers
```bash
# Terminal 1 — Client (port 5173)
cd client && npm run dev

# Terminal 2 — Server (port 5000)
cd server && npm run dev
```

### 4. Health Check
```bash
curl http://localhost:5000/api/health
```

## Project Structure
```
/client           → React app (Vite)
/server           → Express app
  /src/models     → Mongoose schemas
  /src/routes     → Route definitions
  /src/controllers → Business logic
  /src/middleware → Auth, error handling, validation
  /src/jobs       → node-cron jobs
  /src/utils      → Helpers (email, tokens)
```

## License
MIT
