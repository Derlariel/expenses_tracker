import { Router } from 'express';
import { pool } from '../db/pool.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [totalRows] = await pool.query('SELECT SUM(amount) AS total FROM expenses');
    const total = totalRows[0].total || 0;

    const [catRows] = await pool.query(`
      SELECT c.name AS category, SUM(e.amount) AS total
      FROM expenses e
      JOIN categories c ON c.id = e.category_id
      GROUP BY c.name
    `);

    const byCategory = {};
    for (const row of catRows) {
      byCategory[row.category] = Number(row.total);
    }

    const [monthRows] = await pool.query(`
      SELECT DATE_FORMAT(expense_date, '%Y-%m') AS month, SUM(amount) AS total
      FROM expenses
      GROUP BY month
      ORDER BY month ASC
    `);

    const byMonth = {};
    for (const row of monthRows) {
      byMonth[row.month] = Number(row.total);
    }

    res.json({ total, byCategory, byMonth });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
