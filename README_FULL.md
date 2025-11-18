# zohaib-mern-portfolio

A personal portfolio / demo MERN application with a Next.js frontend and an Express + Socket.IO backend. This repository demonstrates a full-stack setup that includes a Next app (client), an Express API and real-time chat (server), and starter UI components.

This document summarizes what is implemented, what still needs to be added, and how to run the project locally.

---

## Current status — What has been implemented

- Frontend (`client/`)
  - Next.js app (app router) scaffolded under `client/src/app`.
  - Pages: `client/src/app/page.tsx`, `client/src/app/chat/page.tsx`, `client/src/app/client/page.tsx`, `client/src/app/admin/page.tsx` (some are placeholder pages).
  - Basic UI components added as lightweight stubs to allow the app to compile: `client/src/components/ui/{button,card,badge,input,scroll-area}.tsx`.
  - Socket.IO client code in `client/src/app/chat/page.tsx` that connects to a backend socket URL (defaults to `http://localhost:5000`).

- Backend (`server/`)
  - Express server in `server/index.js` with Socket.IO integration for real-time chat.
  - MongoDB connection via `mongoose` (reads `MONGODB_URI` from `server/.env`).
  - Route placeholders created: `server/routes/{userRoutes.js,orderRoutes.js,messageRoutes.js}` and model placeholders in `server/models/{User.js,Order.js,Message.js}`.
  - Environment file `server/.env` (contains DB URI and JWT secret locally). **Note:** rotate credentials if they were committed previously.

- Dev tooling & run state
  - `nodemon` used to run the backend in development. `next dev` runs the frontend on port `3000`.
  - The repository contains a basic `.gitignore` (including `.env`).

---

## What still needs to be added (priority list)

1. Backend models & route implementations (high priority)
   - Implement Mongoose schemas in `server/models/*.js` for `User`, `Order`, `Message`.
   - Implement route handlers in `server/routes/*.js` with proper controllers and validation.

2. Authentication & authorization
   - Add register / login endpoints, password hashing (`bcryptjs`), JWT issuance/verification middleware, and protect private endpoints (orders, admin routes).

3. Chat persistence and improvements
   - Optionally persist chat messages to the DB (`Message` model).
   - Improve `client/src/app/chat/page.tsx` with usernames, timestamps, scroll-to-bottom, reconnect logic, and delivery acknowledgement.

4. UI polish
   - Replace the temporary UI components with real, styled components (e.g., shadcn, Tailwind variants), and make pages responsive and accessible.

5. Environment & secrets
   - Add `client/.env.local` for `NEXT_PUBLIC_SOCKET_URL`.
   - Add `server/.env.example` and ensure sensitive credentials are not committed.

6. Dev reproducibility (recommended)
   - Add a `devcontainer.json` or Docker compose that maps host ports (`3000`, `5000`) to the container for consistent port forwarding.

7. Testing, CI and docs
   - Add unit/integration tests and a GitHub Actions workflow for lint/build/test.
   - Expand documentation (API reference, deployment steps).

---

## Environment variables

Create a `.env` file inside `server/` (already present in this workspace). Required variables:

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000        # optional, defaults to 5000
```

For the client you can create `client/.env.local` to explicitly set the socket server URL:

```
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

---

## Run locally (development)

1. Start the backend

```bash
cd server
npm install
# start with nodemon (development)
npm run dev
```

2. Start the frontend

```bash
cd client
npm install
npm run dev
```

3. Visit the app and chat

- Open the frontend: `http://localhost:3000`
- Open the chat page: `http://localhost:3000/chat`

Notes:
- The backend listens on `5000` by default; the frontend connects to the socket server at `NEXT_PUBLIC_SOCKET_URL` or `http://localhost:5000` by default.
- If you run inside Codespaces / a remote container, ensure ports `3000` and `5000` are forwarded in the environment.

---

## Quick API surface (to be implemented)

- `POST /api/users/register` — create a new user
- `POST /api/users/login` — authenticate and return JWT
- `GET /api/orders` — list orders (protected)
- `POST /api/orders` — create order (protected)
- `GET /api/messages` — fetch persisted messages (optional)
- Socket.IO events:
  - `sendMessage` (client -> server) — send a message object
  - `receiveMessage` (server -> clients) — broadcast received messages

---

## Security & cleanup

- If you previously committed sensitive values, rotate those credentials (MongoDB user/password, API keys).
- `.env` is listed in `.gitignore` to prevent future commits.

---

## Recommended next steps (pick one)

- Implement backend models and basic route handlers (I can scaffold these files for you).
- Add authentication and protect the order routes.
- Improve the chat UI and socket reliability (I can add usernames/timestamps and reconnect logic).
- Add a `devcontainer.json` or `docker-compose.yml` so the environment can be started consistently.

If you want, tell me which item to start with and I will implement it and open a PR or apply changes directly in this workspace.

---

## Contact

If you need a hand implementing any of the items above, tell me which part to tackle first and I'll get started.
