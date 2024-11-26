import React, { useState } from 'react';

interface MessageFormProps {
  onSubmit: (data: any) => void;
  groups: any[];
}

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit, groups }) => {
  const [selectedType, setSelectedType] = useState('groupe');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit({ ...data, type_destinataire: selectedType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Type de destinataire</label>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type_destinataire"
              value="groupe"
              checked={selectedType === 'groupe'}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Groupe</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type_destinataire"
              value="individuel"
              checked={selectedType === 'individuel'}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Individuel</span>
          </label>
        </div>
      </div>

      {selectedType === 'groupe' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700">Groupe</label>
          <select
            name="groupe_id"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.nom}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
          <input
            type="tel"
            name="numero"
            placeholder="+33612345678"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Planification</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="date_envoi"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            type="time"
            name="heure_envoi"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button type="submit" className="btn btn-primary">
          Envoyer
        </button>
      </div>
    </form>
  );
};

export default MessageForm;