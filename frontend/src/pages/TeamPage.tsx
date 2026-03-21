import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getTrip, updateTrip, getTripMembers, type Trip, type Member } from '../api';

const sidebarItems = [
  { label: 'Team', icon: '/icons/team.svg', path: 'team' },
  { label: 'Travel Plan', icon: '/icons/travel-plan.svg', path: 'travel-plan' },
  { label: 'Kanban Board', icon: '/icons/kanban-board.svg', path: 'kanban' },
  { label: 'Expenses', icon: '/icons/expenses.svg', path: 'expenses' },
];

const TeamPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripId) return;
    setLoading(true);
    Promise.all([getTrip(tripId), getTripMembers(tripId)])
      .then(([tripData, membersData]) => {
        setTrip(tripData);
        setEditTitle(tripData.title);
        setMembers(membersData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tripId]);

  const handleTitleSave = async () => {
    if (!trip || !editTitle.trim() || editTitle === trip.title) {
      setIsEditingTitle(false);
      setEditTitle(trip?.title || '');
      return;
    }
    try {
      const updated = await updateTrip(trip.id, {
        title: editTitle.trim(),
        destination: trip.destination,
        start_date: trip.start_date,
        end_date: trip.end_date,
        budget_amount: trip.budget_amount,
        budget_currency: trip.budget_currency,
      });
      setTrip(updated);
      setEditTitle(updated.title);
    } catch (err) {
      console.error(err);
      setEditTitle(trip.title);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleTitleSave();
    if (e.key === 'Escape') {
      setIsEditingTitle(false);
      setEditTitle(trip?.title || '');
    }
  };

  const formatDate = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return `${s.toLocaleDateString('en-US', opts)} - ${e.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-57px)] items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      {/* Sidebar */}
      <aside className="w-60 border-r border-gray-200 bg-white px-4 py-6">
        <NavLink to="/dashboard" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
          &lt; Back
        </NavLink>
        <h2 className="mb-6 text-xl font-bold text-gray-900">{trip?.title || 'Travel Name'}</h2>
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/travel/${tripId}/${item.path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#eeeef8] text-[#3d3d5e]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <img src={item.icon} alt={item.label} className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 bg-[#f9f9fb] p-8">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/vehicles/hot-air-balloon.svg" alt="" className="h-[100px] w-auto opacity-20 grayscale" />
            {isEditingTitle ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
                autoFocus
                className="rounded-lg border border-[#3d3d5e] px-3 py-1 text-2xl font-bold text-gray-900 outline-none"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900">
                {trip?.title || 'Trip Name'}
              </h1>
            )}
          </div>
          <button
            onClick={() => setIsEditingTitle(true)}
            className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
          >
            Edit Trip Name
          </button>
        </div>

        {/* Divider + Sort/Filter */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <div />
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              ☰ Sort by
            </button>
            <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Filter
            </button>
          </div>
        </div>

        {/* Action Bars */}
        <div className="mb-8 flex gap-4">
          <div className="flex flex-1 items-center justify-between rounded-xl bg-[#3d3d5e] px-6 py-3 font-semibold text-white">
            <span>Travel Date</span>
            <span className="flex items-center gap-2">
              <img src="/icons/date.svg" alt="" className="h-5 w-5 brightness-0 invert" />
              {trip ? formatDate(trip.start_date, trip.end_date) : 'Loading...'}
            </span>
          </div>
          <div className="flex flex-1 cursor-pointer items-center justify-between rounded-xl bg-[#3d3d5e] px-6 py-3 font-semibold text-white transition hover:bg-[#2f2f4a]">
            <span>Copy Invitation Note</span>
            <img src="/icons/copy.svg" alt="" className="h-5 w-5" />
          </div>
        </div>

        {/* Members */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="text-lg font-semibold text-gray-900">Members</h2>
            <span className="text-sm text-gray-500">
              {members.length} / <span className="text-gray-400">20</span>
            </span>
          </div>

          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 px-5 py-3"
              >
                <span className="text-sm text-gray-700">{member.name}</span>
                {member.pivot.role === 'owner' ? (
                  <span className="text-sm text-gray-400">You</span>
                ) : (
                  <button className="text-sm text-gray-400 transition hover:text-gray-700">
                    ✕
                  </button>
                )}
              </div>
            ))}

            {/* Add member */}
            {members.length < 20 && (
              <div className="flex gap-3">
                <button className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-gray-300 px-5 py-3 text-sm text-gray-400 transition hover:border-[#3d3d5e] hover:text-[#3d3d5e]">
                  + Add member
                </button>
                <button className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-gray-300 px-5 py-3 text-sm text-gray-400 transition hover:border-[#3d3d5e] hover:text-[#3d3d5e]">
                  + Invite link
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Watermark */}
        <img src="/vehicles/Union.svg" alt="" className="fixed bottom-10 right-10 h-40 w-auto opacity-10 grayscale pointer-events-none" />
      </main>
    </div>
  );
};

export default TeamPage;
