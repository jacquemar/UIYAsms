import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import smsService from '../services/smsService.js';

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY date_env DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send new message
router.post('/',
  [
    body('dest_msg').notEmpty(),
    body('type_msg').notEmpty(),
    body('txt_msg').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { dest_msg, type_msg, txt_msg } = req.body;
      
      // Enregistrer le message dans la base de données
      const dbResult = await pool.query(
        'INSERT INTO messages (dest_msg, type_msg, txt_msg, date_env, stat_msg) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4) RETURNING *',
        [dest_msg, type_msg, txt_msg, 'EN_COURS']
      );

      // Envoyer le SMS via Kannel
      await smsService.sendSMS(dest_msg, txt_msg);

      // Mettre à jour le statut
      await pool.query(
        'UPDATE messages SET stat_msg = $1 WHERE id_msg = $2',
        ['ENVOYE', dbResult.rows[0].id_msg]
      );

      res.status(201).json(dbResult.rows[0]);
    } catch (err) {
      console.error('Error sending message:', err);
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;