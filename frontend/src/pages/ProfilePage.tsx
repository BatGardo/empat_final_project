import { useState } from 'react';
import { getMe, updateMe } from '../api';
import LogoutButton from '../components/logout-button/LogoutButton';

const ProfilePage = () => {
  const user = getMe();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const handleSave = async () => {
    if (user && name.trim() && name !== user.name) {
      try {
        await updateMe({ name: name.trim() });
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-[#f9f9fb] px-5 py-6 md:px-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Profile</h1>

      <div className="flex flex-col items-start gap-6 md:flex-row">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6 text-center md:w-52">
          <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full bg-gray-200">
            <img
              src="/foto/avatar.png"
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
          <p className="text-sm text-gray-400">{user?.email || ''}</p>
        </div>

        <div className="w-full flex-1 rounded-xl border border-gray-200 bg-white p-6">
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
              <label className="mb-1 block text-sm font-medium text-gray-500">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                  }}
                  autoFocus
                  className="w-full rounded-full border border-gray-300 px-5 py-2 text-sm outline-none focus:border-[#3d3d5e] md:w-80"
                />
              ) : (
                <p className="text-sm text-gray-900">{user?.name || '-'}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">
                Email
              </label>
              <p className="text-sm text-gray-900">{user?.email || '-'}</p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">
                Timezone
              </label>
              <p className="text-sm text-gray-900">
                {user?.default_timezone || '-'}
              </p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">Log Out</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You will end your current session and return to the login
                    screen.
                  </p>
                </div>

                <LogoutButton className="shrink-0 rounded-full border border-gray-300 px-8 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:self-auto" />
              </div>
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
                onClick={() => {
                  setIsEditing(false);
                  setName(user?.name || '');
                }}
                className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <img
        src="/vehicles/Union.svg"
        alt=""
        className="pointer-events-none fixed right-10 bottom-10 h-40 w-auto opacity-10 grayscale"
      />
    </div>
  );
};

export default ProfilePage;
