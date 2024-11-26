import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Traitement des SMS entrants
router.post('/incoming', async (req, res) => {
  try {
    const { from, message } = req.body;
    const words = message.trim().toUpperCase().split(' ');
    const keyword = words[0];

    // Vérifier si le mot-clé existe
    const keywordResult = await pool.query(
      'SELECT * FROM sms_keywords WHERE keyword = $1',
      [keyword]
    );

    if (keywordResult.rows.length === 0) {
      return res.status(400).json({
        error: 'Mot-clé invalide',
        response: 'Désolé, ce mot-clé n\'est pas reconnu.'
      });
    }

    const keywordAction = keywordResult.rows[0].action_type;
    let response = '';

    switch (keywordAction) {
      case 'GET_MOYENNE':
        if (words.length < 2) {
          response = 'Format incorrect. Utilisez: MOY [MATRICULE]';
        } else {
          const matricule = words[1];
          const moyenneResult = await pool.query(`
            SELECT m.moy, e.nom_etu
            FROM etudiants e
            JOIN obtenir o ON e.mat_etu = o.mat_etu
            JOIN moyenne m ON o.id_moy = m.id_moy
            WHERE e.mat_etu = $1
            ORDER BY m.id_moy DESC
            LIMIT 1
          `, [matricule]);

          if (moyenneResult.rows.length > 0) {
            const { nom_etu, moy } = moyenneResult.rows[0];
            response = `${nom_etu}: Moyenne = ${moy}/20`;
          } else {
            response = 'Étudiant non trouvé ou pas de moyenne disponible.';
          }
        }
        break;

      case 'GET_ABSENCES':
        if (words.length < 2) {
          response = 'Format incorrect. Utilisez: ABS [MATRICULE]';
        } else {
          const matricule = words[1];
          const absencesResult = await pool.query(`
            SELECT SUM(c.nbre_h) as total_absences
            FROM etudiants e
            JOIN cumuler c ON e.mat_etu = c.mat_etu
            WHERE e.mat_etu = $1
          `, [matricule]);

          if (absencesResult.rows.length > 0) {
            const { total_absences } = absencesResult.rows[0];
            response = `Total des absences: ${total_absences || 0} heures`;
          } else {
            response = 'Étudiant non trouvé ou pas d\'absences enregistrées.';
          }
        }
        break;

      case 'GET_EMPLOI_DU_TEMPS':
        if (words.length < 2) {
          response = 'Format incorrect. Utilisez: EDT [MATRICULE]';
        } else {
          const matricule = words[1];
          const edtResult = await pool.query(`
            SELECT DISTINCT e.jour, e.matiere
            FROM etudiants s
            JOIN classe c ON s.id_class = c.id_class
            JOIN emploi_du_temps e ON c.id_class = e.id_class
            WHERE s.mat_etu = $1
            ORDER BY e.jour
          `, [matricule]);

          if (edtResult.rows.length > 0) {
            response = edtResult.rows
              .map(({ jour, matiere }) => `${jour}: ${matiere}`)
              .join('\n');
          } else {
            response = 'Emploi du temps non disponible.';
          }
        }
        break;

      case 'GET_SOLDE':
        if (words.length < 2) {
          response = 'Format incorrect. Utilisez: SOLDE [MATRICULE]';
        } else {
          const matricule = words[1];
          const soldeResult = await pool.query(`
            SELECT e.nom_etu, s.mt_sco, COALESCE(SUM(v.mt_vers), 0) as total_verse
            FROM etudiants e
            JOIN scolarite s ON e.id_sco = s.id_sco
            LEFT JOIN effectuer ef ON e.mat_etu = ef.mat_etu
            LEFT JOIN versement v ON ef.id_vers = v.id_vers
            WHERE e.mat_etu = $1
            GROUP BY e.nom_etu, s.mt_sco
          `, [matricule]);

          if (soldeResult.rows.length > 0) {
            const { nom_etu, mt_sco, total_verse } = soldeResult.rows[0];
            const reste = mt_sco - total_verse;
            response = `${nom_etu}\nScolarité: ${mt_sco} FCFA\nVersé: ${total_verse} FCFA\nReste: ${reste} FCFA`;
          } else {
            response = 'Informations de scolarité non disponibles.';
          }
        }
        break;

      default:
        response = 'Service temporairement indisponible.';
    }

    // Enregistrer le message et la réponse
    await pool.query(
      'INSERT INTO messages (dest_msg, type_msg, txt_msg, stat_msg) VALUES ($1, $2, $3, $4)',
      [from, 'REPONSE', response, 'ENVOYE']
    );

    res.json({ response });
  } catch (err) {
    console.error('Erreur traitement SMS:', err);
    res.status(500).json({
      error: 'Erreur serveur',
      response: 'Une erreur est survenue. Veuillez réessayer plus tard.'
    });
  }
});

export default router;