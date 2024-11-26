import React from 'react';

interface KeywordFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const KeywordForm: React.FC<KeywordFormProps> = ({ onSubmit, initialData }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Mot-clé</label>
        <input
          type="text"
          name="keyword"
          defaultValue={initialData?.keyword}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Le mot-clé doit être court et en majuscules (ex: MOY, ABS, EDT)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          defaultValue={initialData?.description}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type d'action</label>
        <select
          name="action_type"
          defaultValue={initialData?.action_type}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="GET_MOYENNE">Obtenir la moyenne</option>
          <option value="GET_ABSENCES">Consulter les absences</option>
          <option value="GET_EMPLOI_DU_TEMPS">Voir l'emploi du temps</option>
          <option value="GET_SOLDE">Vérifier le solde</option>
          <option value="CUSTOM">Action personnalisée</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Format attendu</label>
        <input
          type="text"
          name="format"
          placeholder="MOY [MATRICULE]"
          defaultValue={initialData?.format}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Décrivez le format attendu pour ce mot-clé (ex: MOY [MATRICULE])
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Mettre à jour' : 'Créer le mot-clé'}
        </button>
      </div>
    </form>
  );
};

export default KeywordForm;