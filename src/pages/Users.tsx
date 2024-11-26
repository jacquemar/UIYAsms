import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import { Plus } from 'lucide-react';

const Users = () => {
  const [users] = useState([
    {
      mat_etu: 'ETU001',
      nom_etu: 'Jean Dupont',
      cont_etu: '+33612345678',
      cont_par: '+33687654321',
      cod_sec: 'TS2',
      cod_form: 'BAC'
    },
    // Ajoutez plus d'utilisateurs ici
  ]);

  const columns = [
    { key: 'mat_etu', label: 'Matricule' },
    { key: 'nom_etu', label: 'Nom' },
    { key: 'cont_etu', label: 'Contact Étudiant' },
    { key: 'cont_par', label: 'Contact Parent' },
    { key: 'cod_sec', label: 'Section' },
    { key: 'cod_form', label: 'Formation' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Gestion des Utilisateurs" 
          description="Gérez les étudiants et leurs informations"
        />
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un utilisateur
        </button>
      </div>
      
      <DataTable 
        columns={columns} 
        data={users}
        onEdit={(user) => console.log('Edit user:', user)}
        onDelete={(user) => console.log('Delete user:', user)}
      />
    </div>
  );
};

export default Users;