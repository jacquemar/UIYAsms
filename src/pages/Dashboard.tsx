import React, { useState } from 'react';
import { Users, MessageSquare, Bell, CheckCircle, Key } from 'lucide-react';
import Modal from '../components/Modal';
import KeywordForm from '../components/KeywordForm';

const StatCard = ({ icon: Icon, label, value, color }: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false);
  const [keywords, setKeywords] = useState([
    {
      keyword: 'MOY',
      description: 'Obtenir la moyenne d\'un étudiant',
      action_type: 'GET_MOYENNE',
      example: 'MOY ETU001'
    },
    {
      keyword: 'ABS',
      description: 'Obtenir les absences d\'un étudiant',
      action_type: 'GET_ABSENCES',
      example: 'ABS ETU001'
    }
  ]);

  const stats = [
    {
      icon: Users,
      label: 'Utilisateurs',
      value: '2,543',
      color: 'bg-blue-500'
    },
    {
      icon: MessageSquare,
      label: 'Messages envoyés',
      value: '15,672',
      color: 'bg-green-500'
    },
    {
      icon: Bell,
      label: 'Notifications',
      value: '89',
      color: 'bg-yellow-500'
    },
    {
      icon: Key,
      label: 'Mots-clés actifs',
      value: '4',
      color: 'bg-purple-500'
    }
  ];

  const handleKeywordSubmit = (data: any) => {
    console.log('New keyword:', data);
    setIsKeywordModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue dans votre système de gestion SMS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Mots-clés SMS</h2>
            <button 
              onClick={() => setIsKeywordModalOpen(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              Nouveau mot-clé
            </button>
          </div>
          <div className="space-y-4">
            {keywords.map((keyword, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{keyword.keyword}</h3>
                    <p className="text-sm text-gray-600">{keyword.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Exemple: <code className="bg-gray-100 px-1 py-0.5 rounded">{keyword.example}</code>
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Actif
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Message envoyé aux étudiants de Terminal S</p>
                  <p className="text-xs text-gray-500">Il y a 2 heures</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isKeywordModalOpen}
        onClose={() => setIsKeywordModalOpen(false)}
        title="Nouveau mot-clé SMS"
      >
        <KeywordForm onSubmit={handleKeywordSubmit} />
      </Modal>
    </div>
  );
};

export default Dashboard;