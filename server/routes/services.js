import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY id_service');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new service
router.post('/',
  [
    body('nom_service').notEmpty(),
    body('description').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nom_service, description } = req.body;
      const result = await pool.query(
        'INSERT INTO services (nom_service, description, statut) VALUES ($1, $2, $3) RETURNING *',
        [nom_service, description, 'Actif']
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;