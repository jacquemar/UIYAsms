import React from 'react';

interface UserFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Matricule</label>
        <input
          type="text"
          name="mat_etu"
          defaultValue={initialData?.mat_etu}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom complet</label>
        <input
          type="text"
          name="nom_etu"
          defaultValue={initialData?.nom_etu}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Étudiant</label>
        <input
          type="tel"
          name="cont_etu"
          defaultValue={initialData?.cont_etu}
          placeholder="+33612345678"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Parent</label>
        <input
          type="tel"
          name="cont_par"
          defaultValue={initialData?.cont_par}
          placeholder="+33612345678"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Section</label>
          <input
            type="text"
            name="cod_sec"
            defaultValue={initialData?.cod_sec}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Formation</label>
          <input
            type="text"
            name="cod_form"
            defaultValue={initialData?.cod_form}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;