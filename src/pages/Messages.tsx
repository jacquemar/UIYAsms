import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import MessageForm from '../components/MessageForm';
import GroupForm from '../components/GroupForm';
import { Plus, Users } from 'lucide-react';

const Messages = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [messages] = useState([
    {
      id_msg: 1,
      date_env: '2024-03-15',
      dest_msg: 'TS2',
      type_msg: 'Information',
      txt_msg: 'Réunion parents-professeurs le 20 mars',
      stat_msg: 'Envoyé'
    }
  ]);

  const [groups] = useState([
    { id: 1, nom: 'Terminal S2', description: 'Classe de Terminal S2' },
    { id: 2, nom: 'Parents TS2', description: 'Groupe des parents TS2' }
  ]);

  const columns = [
    { key: 'date_env', label: 'Date' },
    { key: 'dest_msg', label: 'Destinataire' },
    { key: 'type_msg', label: 'Type' },
    { key: 'txt_msg', label: 'Message' },
    { key: 'stat_msg', label: 'Statut' }
  ];

  const handleMessageSubmit = (data: any) => {
    console.log('New message:', data);
    setIsMessageModalOpen(false);
  };

  const handleGroupSubmit = (data: any) => {
    console.log('New group:', data);
    setIsGroupModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Gestion des Messages" 
          description="Envoyez et suivez vos messages SMS"
        />
        <div className="space-x-3">
          <button 
            onClick={() => setIsGroupModalOpen(true)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Nouveau groupe
          </button>
          <button 
            onClick={() => setIsMessageModalOpen(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nouveau message
          </button>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Historique des messages</h3>
        <DataTable 
          columns={columns} 
          data={messages}
          onEdit={(message) => console.log('Edit message:', message)}
          onDelete={(message) => console.log('Delete message:', message)}
        />
      </div>

      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        title="Nouveau message"
      >
        <MessageForm onSubmit={handleMessageSubmit} groups={groups} />
      </Modal>

      <Modal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        title="Nouveau groupe de diffusion"
      >
        <GroupForm 
          onSubmit={handleGroupSubmit}
          users={[
            { mat_etu: 'ETU001', nom_etu: 'Jean Dupont' },
            { mat_etu: 'ETU002', nom_etu: 'Marie Martin' }
          ]}
        />
      </Modal>
    </div>
  );
};

export default Messages;