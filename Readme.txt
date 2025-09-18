# Expense Tracker — Deployment Setup

## Database (DB)
Platform: Railway
Type: MySQL
Database name: expenses_tracker

## Backend (BE)
Platform: Render
Directory: server/

Build Command: npm install
Start Command: node src/index.js

Environment Variables:
MYSQL_HOST=...
MYSQL_PORT=...
MYSQL_USER=root
MYSQL_PASSWORD=...
MYSQL_DATABASE=expenses_tracker

## Frontend (FE)
Platform: Vercel
Directory: client/

Environment Variables:
VITE_API_URL=https://<render-backend>.onrender.com

# Summary
DB อยู่ Railway  
BE อยู่ Render  
FE อยู่ Vercel  
FE จะยิง API ไปที่ BE ผ่าน VITE_API_URL
