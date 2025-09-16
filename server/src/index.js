import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import expensesRouter from './routes/expenses.js';
import categoriesRouter from './routes/categories.js';
import summaryRouter from './routes/summary.js';
import { pool } from './db/pool.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN, credentials: false }));
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.use('/api/expenses', expensesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/summary', summaryRouter);

app.get('/api/summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = [];
    if (startDate) dateFilter.push(`expense_date >= '${startDate}'`);
    if (endDate) dateFilter.push(`expense_date <= '${endDate}'`);
    const where = dateFilter.length ? `WHERE ${dateFilter.join(' AND ')}` : '';

    const [totalRows] = await pool.query(`SELECT SUM(amount) AS total FROM expenses ${where}`);
    const total = Number(totalRows[0].total || 0);

    const [byCategory] = await pool.query(`
      SELECT c.name AS category, SUM(e.amount) AS sum
      FROM expenses e
      JOIN categories c ON c.id = e.category_id
      ${where}
      GROUP BY c.name
    `);

    const [byMonth] = await pool.query(`
      SELECT DATE_FORMAT(expense_date, '%Y-%m') as ym, SUM(amount) as sum
      FROM expenses
      ${where}
      GROUP BY ym
      ORDER BY ym ASC
    `);

    res.json({
      total,
      byCategory: Object.fromEntries(byCategory.map(r => [r.category, Number(r.sum)])),
      byMonth: Object.fromEntries(byMonth.map(r => [r.ym, Number(r.sum)]))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log('API running on port', PORT);
});
