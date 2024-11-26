import React from 'react';

interface GroupFormProps {
  onSubmit: (data: any) => void;
  users: any[];
  initialData?: any;
}

const GroupForm: React.FC<GroupFormProps> = ({ onSubmit, users, initialData }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const selectedUsers = Array.from(formData.getAll('users'));
    onSubmit({ ...data, users: selectedUsers });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom du groupe</label>
        <input
          type="text"
          name="nom"
          defaultValue={initialData?.nom}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          defaultValue={initialData?.description}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Membres</label>
        <div className="max-h-60 overflow-y-auto border rounded-md p-2">
          {users.map((user) => (
            <label key={user.mat_etu} className="flex items-center p-2 hover:bg-gray-50">
              <input
                type="checkbox"
                name="users"
                value={user.mat_etu}
                defaultChecked={initialData?.users?.includes(user.mat_etu)}
                className="form-checkbox h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">{user.nom_etu}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Mettre à jour' : 'Créer le groupe'}
        </button>
      </div>
    </form>
  );
};

export default GroupForm;