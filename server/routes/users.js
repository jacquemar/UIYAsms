import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM etudiants ORDER BY mat_etu');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new user
router.post('/',
  [
    body('mat_etu').notEmpty(),
    body('nom_etu').notEmpty(),
    body('cont_etu').matches(/^\+\d{10,}$/),
    body('cont_par').matches(/^\+\d{10,}$/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { mat_etu, nom_etu, cont_etu, cont_par, cod_sec, cod_form } = req.body;
      const result = await pool.query(
        'INSERT INTO etudiants (mat_etu, nom_etu, cont_etu, cont_par, cod_sec, cod_form) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [mat_etu, nom_etu, cont_etu, cont_par, cod_sec, cod_form]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;