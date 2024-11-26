import React from 'react';

interface ServiceFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit, initialData }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom du service</label>
        <input
          type="text"
          name="nom_service"
          defaultValue={initialData?.nom_service}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          defaultValue={initialData?.description}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type de destinataires</label>
        <select
          name="type_destinataire"
          defaultValue={initialData?.type_destinataire || 'etudiants'}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="etudiants">Étudiants</option>
          <option value="parents">Parents</option>
          <option value="tous">Tous</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Fréquence d'envoi</label>
        <select
          name="frequence"
          defaultValue={initialData?.frequence || 'quotidien'}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="quotidien">Quotidien</option>
          <option value="hebdomadaire">Hebdomadaire</option>
          <option value="mensuel">Mensuel</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Heure d'envoi</label>
        <input
          type="time"
          name="heure_envoi"
          defaultValue={initialData?.heure_envoi || "08:00"}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Mettre à jour' : 'Créer le service'}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;