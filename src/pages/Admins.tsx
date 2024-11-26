import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import { Plus } from 'lucide-react';

const Admins = () => {
  const [admins] = useState([
    {
      id: 1,
      nom: 'Admin Principal',
      email: 'admin@ecole.fr',
      role: 'Super Admin',
      statut: 'Actif'
    }
  ]);

  const columns = [
    { key: 'nom', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rôle' },
    { key: 'statut', label: 'Statut' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Administrateurs" 
          description="Gérez les accès administrateurs"
        />
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouvel administrateur
        </button>
      </div>
      
      <DataTable 
        columns={columns} 
        data={admins}
        onEdit={(admin) => console.log('Edit admin:', admin)}
        onDelete={(admin) => console.log('Delete admin:', admin)}
      />
    </div>
  );
};

export default Admins;