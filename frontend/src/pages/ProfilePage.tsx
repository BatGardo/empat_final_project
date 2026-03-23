import { useState } from 'react';
import { getMe } from '../api';

const ProfilePage = () => {
  const user = getMe();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const handleSave = () => {
    if (user && name.trim() && name !== user.name) {
      const updated = { ...user, name: name.trim() };
      localStorage.setItem('auth_user', JSON.stringify(updated));
      window.location.reload();
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-[#f9f9fb] px-8 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Profile</h1>

      <div className="flex items-start gap-6">
        <div className="w-52 rounded-xl border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full bg-gray-200">
            <img src="/foto/avatar.png" alt="Avatar" className="h-full w-full object-cover" />
          </div>
          <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
          <p className="text-sm text-gray-400">{user?.email || ''}</p>
        </div>

        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Settings</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
                  autoFocus
                  className="w-80 rounded-full border border-gray-300 px-5 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                />
              ) : (
                <p className="text-sm text-gray-900">{user?.name || '-'}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">Email</label>
              <p className="text-sm text-gray-900">{user?.email || '-'}</p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">Timezone</label>
              <p className="text-sm text-gray-900">{user?.default_timezone || '-'}</p>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                className="rounded-full bg-[#3d3d5e] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
              >
                Save Changes
              </button>
              <button
                onClick={() => { setIsEditing(false); setName(user?.name || ''); }}
                className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <img src="/vehicles/Union.svg" alt="" className="fixed bottom-10 right-10 h-40 w-auto opacity-10 grayscale pointer-events-none" />
    </div>
  );
};

export default ProfilePage;
