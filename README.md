# Expense Tracker (React + Node.js + MySQL, Dockerized)

One-command deploy:
```bash
docker compose up -d --build
```
- Frontend: http://localhost:5173
- Backend:  http://localhost:8080/api/health
- MySQL:    localhost:3306 (user: expenses_user / password: rootpass)

## Env
Create `.env` in the project root or use defaults from `docker-compose.yml`:
```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=expenses_tracker
MYSQL_USER=expenses_user
MYSQL_PASSWORD=rootpass
BACKEND_PORT=8080
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:8080
```

## Features
- Create/Edit/Delete expenses
- Categories with seeds
- Date range + category filter, sorting
- Dashboard summary (per category, per month)

## Quick local (without Docker)
- Backend:
  ```bash
  cd server
  npm i
  npm run dev
  ```
- Frontend:
  ```bash
  cd client
  npm i
  npm run dev
  ```

## Notes
- MySQL starts with an init script creating tables and seed categories.
- Data is persisted in a Docker volume `mysql_data`.
