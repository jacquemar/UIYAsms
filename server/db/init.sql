-- Tables principales
CREATE TABLE IF NOT EXISTS filiere (
  code_fil VARCHAR(10) PRIMARY KEY,
  cycle_fil VARCHAR(50) NOT NULL,
  lib_fil VARCHAR(100) NOT NULL,
  type_fil VARCHAR(50) NOT NULL,
  mt_ins DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS classe (
  id_class SERIAL PRIMARY KEY,
  niv VARCHAR(20) NOT NULL,
  grpe VARCHAR(20) NOT NULL,
  classe VARCHAR(50) NOT NULL,
  code_fil VARCHAR(10) REFERENCES filiere(code_fil)
);

CREATE TABLE IF NOT EXISTS emploi_du_temps (
  id_emp SERIAL PRIMARY KEY,
  jour VARCHAR(20) NOT NULL,
  matiere VARCHAR(100) NOT NULL,
  id_class INTEGER REFERENCES classe(id_class)
);

CREATE TABLE IF NOT EXISTS heures_absence (
  id_h_abs SERIAL PRIMARY KEY,
  nbre_h INTEGER NOT NULL,
  date_abs DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS scolarite (
  id_sco SERIAL PRIMARY KEY,
  mt_sco DECIMAL(10,2) NOT NULL,
  code_fil VARCHAR(10) REFERENCES filiere(code_fil)
);

CREATE TABLE IF NOT EXISTS repertoire (
  id_rep SERIAL PRIMARY KEY,
  nom_cont VARCHAR(100) NOT NULL,
  contact VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS moyenne (
  id_moy SERIAL PRIMARY KEY,
  moy DECIMAL(5,2) NOT NULL,
  index_moy INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS versement (
  id_vers SERIAL PRIMARY KEY,
  mt_vers DECIMAL(10,2) NOT NULL,
  vers_total DECIMAL(10,2) NOT NULL,
  solde DECIMAL(10,2) NOT NULL,
  date_vers DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS etudiants (
  mat_etu VARCHAR(10) PRIMARY KEY,
  nom_etu VARCHAR(100) NOT NULL,
  cont_etu VARCHAR(15) NOT NULL,
  cont_par VARCHAR(15) NOT NULL,
  cod_sec VARCHAR(10),
  cout_form DECIMAL(10,2),
  id_class INTEGER REFERENCES classe(id_class),
  id_sco INTEGER REFERENCES scolarite(id_sco),
  id_rep INTEGER REFERENCES repertoire(id_rep)
);

CREATE TABLE IF NOT EXISTS messages (
  id_msg SERIAL PRIMARY KEY,
  date_env TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  dest_msg VARCHAR(100) NOT NULL,
  type_msg VARCHAR(50) NOT NULL,
  txt_msg TEXT NOT NULL,
  stat_msg VARCHAR(20) NOT NULL,
  mat_etu VARCHAR(10) REFERENCES etudiants(mat_etu)
);

-- Tables de liaison
CREATE TABLE IF NOT EXISTS cumuler (
  id_h_abs INTEGER REFERENCES heures_absence(id_h_abs),
  mat_etu VARCHAR(10) REFERENCES etudiants(mat_etu),
  nbre_h INTEGER NOT NULL,
  PRIMARY KEY (id_h_abs, mat_etu)
);

CREATE TABLE IF NOT EXISTS avoir (
  mat_etu VARCHAR(10) REFERENCES etudiants(mat_etu),
  id_emp INTEGER REFERENCES emploi_du_temps(id_emp),
  PRIMARY KEY (mat_etu, id_emp)
);

CREATE TABLE IF NOT EXISTS obtenir (
  mat_etu VARCHAR(10) REFERENCES etudiants(mat_etu),
  id_moy INTEGER REFERENCES moyenne(id_moy),
  PRIMARY KEY (mat_etu, id_moy)
);

CREATE TABLE IF NOT EXISTS effectuer (
  mat_etu VARCHAR(10) REFERENCES etudiants(mat_etu),
  id_vers INTEGER REFERENCES versement(id_vers),
  PRIMARY KEY (mat_etu, id_vers)
);

-- Table pour les mots-clés SMS
CREATE TABLE IF NOT EXISTS sms_keywords (
  id_keyword SERIAL PRIMARY KEY,
  keyword VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  UNIQUE(keyword)
);

-- Insertion des mots-clés par défaut
INSERT INTO sms_keywords (keyword, description, action_type) VALUES
  ('MOY', 'Obtenir la moyenne d''un étudiant', 'GET_MOYENNE'),
  ('ABS', 'Obtenir les absences d''un étudiant', 'GET_ABSENCES'),
  ('EDT', 'Obtenir l''emploi du temps', 'GET_EMPLOI_DU_TEMPS'),
  ('SOLDE', 'Obtenir le solde de scolarité', 'GET_SOLDE');

-- Données de test
INSERT INTO filiere (code_fil, cycle_fil, lib_fil, type_fil, mt_ins) VALUES
  ('INFO', 'Licence', 'Informatique', 'Sciences', 1500000),
  ('GEST', 'Licence', 'Gestion', 'Management', 1300000);

INSERT INTO classe (niv, grpe, classe, code_fil) VALUES
  ('L3', 'A', 'L3 INFO A', 'INFO'),
  ('L3', 'B', 'L3 GEST B', 'GEST');