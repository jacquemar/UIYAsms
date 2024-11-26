import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ServiceForm from '../components/ServiceForm';
import { Plus } from 'lucide-react';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services] = useState([
    {
      id_service: 1,
      nom_service: 'Notifications Absences',
      description: 'Notification automatique des absences aux parents',
      type_destinataire: 'parents',
      frequence: 'quotidien',
      heure_envoi: '17:00',
      statut: 'Actif'
    },
    {
      id_service: 2,
      nom_service: 'Alertes Examens',
      description: 'Rappels des dates d\'examens',
      type_destinataire: 'etudiants',
      frequence: 'hebdomadaire',
      heure_envoi: '18:00',
      statut: 'Actif'
    }
  ]);

  const columns = [
    { key: 'nom_service', label: 'Service' },
    { key: 'description', label: 'Description' },
    { key: 'type_destinataire', label: 'Destinataires' },
    { key: 'frequence', label: 'Fréquence' },
    { key: 'statut', label: 'Statut' }
  ];

  const handleSubmit = (data: any) => {
    console.log('New service:', data);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Services SMS" 
          description="Gérez les services de notification automatique"
        />
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nouveau service
        </button>
      </div>
      
      <DataTable 
        columns={columns} 
        data={services}
        onEdit={(service) => console.log('Edit service:', service)}
        onDelete={(service) => console.log('Delete service:', service)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouveau service"
      >
        <ServiceForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};

export default Services;