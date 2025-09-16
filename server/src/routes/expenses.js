import { Router } from 'express';
import { pool } from '../db/pool.js';

const router = Router();

const formatDate = (d) => {
  if (!d) return d;
  if (d instanceof Date) return d.toISOString().split('T')[0];
  return new Date(d).toISOString().split('T')[0];
};

router.post('/', async (req, res) => {
  try {
    let { amount, description, category_id, expense_date, user_id } = req.body;
    if (!amount || !category_id || !expense_date) {
      return res.status(400).json({ error: 'amount, category_id, expense_date are required' });
    }

    expense_date = formatDate(expense_date); 

    const [result] = await pool.query(
      'INSERT INTO expenses (amount, description, category_id, expense_date, user_id) VALUES (?,?,?,?,?)',
      [amount, description || null, category_id, expense_date, user_id || null]
    );

    const [rows] = await pool.query('SELECT * FROM expenses WHERE id=?', [result.insertId]);
    const row = rows[0];
    row.expense_date = formatDate(row.expense_date); 
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, categoryId, sort = 'expense_date', order = 'desc' } = req.query;
    const where = [];
    const params = [];

    if (startDate) { where.push('expense_date >= ?'); params.push(startDate); }
    if (endDate)   { where.push('expense_date <= ?'); params.push(endDate); }
    if (categoryId){ where.push('category_id = ?'); params.push(categoryId); }

    const whereSql = where.length ? ('WHERE ' + where.join(' AND ')) : '';
    const allowedSort = new Set(['expense_date','amount','created_at','updated_at']);
    const safeSort = allowedSort.has(sort) ? sort : 'expense_date';
    const safeOrder = (order?.toLowerCase() === 'asc') ? 'ASC' : 'DESC';

    const [rows] = await pool.query(
      `SELECT e.*, c.name AS category_name
       FROM expenses e JOIN categories c ON c.id = e.category_id
       ${whereSql}
       ORDER BY ${safeSort} ${safeOrder}`,
      params
    );

    for (const row of rows) {
      row.expense_date = formatDate(row.expense_date); 
    }

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM expenses WHERE id=?', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });

    rows[0].expense_date = formatDate(rows[0].expense_date); 

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    let { amount, description, category_id, expense_date } = req.body;

    expense_date = formatDate(expense_date); 

    const [result] = await pool.query(
      'UPDATE expenses SET amount=?, description=?, category_id=?, expense_date=? WHERE id=?',
      [amount, description || null, category_id, expense_date, req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });

    const [rows] = await pool.query('SELECT * FROM expenses WHERE id=?', [req.params.id]);
    const row = rows[0];
    row.expense_date = formatDate(row.expense_date); 
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM expenses WHERE id=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
