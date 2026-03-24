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
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');

  useEffect(() => {
    if (!tripId) return;
    setLoading(true);
    Promise.all([getTrip(tripId), getTripMembers(tripId)])
      .then(([tripData, membersData]) => {
        setTrip(tripData);
        setEditTitle(tripData.title);
        const saved = localStorage.getItem(`members_${tripId}`);
        if (saved) {
          const localMembers: Member[] = JSON.parse(saved);
          const apiIds = new Set(membersData.map((m: Member) => m.id));
          const localOnly = localMembers.filter((m) => !apiIds.has(m.id));
          setMembers([...membersData, ...localOnly]);
        } else {
          setMembers(membersData);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tripId]);

  useEffect(() => {
    if (tripId && members.length > 0) {
      localStorage.setItem(`members_${tripId}`, JSON.stringify(members));
    }
  }, [members, tripId]);

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
      <aside className="hidden w-60 border-r border-gray-200 bg-white px-4 py-6 md:block">
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

      <main className="relative flex-1 bg-[#f9f9fb] p-4 md:p-8">
        <div className="mb-4 flex flex-col items-center md:mb-2 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/vehicles/hot-air-balloon.svg" alt="" className="hidden h-[100px] w-auto opacity-20 grayscale md:block" />
            {isEditingTitle ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
                autoFocus
                className="rounded-lg border border-[#3d3d5e] px-3 py-1 text-xl font-bold text-gray-900 outline-none md:text-2xl"
              />
            ) : (
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                {trip?.title || 'Trip Name'}<span className="md:hidden"> Team</span>
              </h1>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 border-b border-gray-200 pb-4 md:mb-6 md:justify-end md:gap-3">
          <button
            onClick={() => setIsEditingTitle(true)}
            className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
          >
            Edit Trip Name
          </button>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            ☰ Sort by
          </button>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Filter
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:gap-4">
          <div className="flex flex-1 items-center justify-between rounded-xl bg-[#3d3d5e] px-4 py-3 text-sm font-semibold text-white md:px-6 md:text-base">
            <span>Travel Date</span>
            <span className="flex items-center gap-2">
              <img src="/icons/date.svg" alt="" className="h-5 w-5 brightness-0 invert" />
              {trip ? formatDate(trip.start_date, trip.end_date) : 'Loading...'}
            </span>
          </div>
          <div className="flex flex-1 cursor-pointer items-center justify-between rounded-xl bg-[#3d3d5e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2f2f4a] md:px-6 md:text-base">
            <span>Copy Invitation Note</span>
            <img src="/icons/copy.svg" alt="" className="h-5 w-5" />
          </div>
        </div>

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
                  <button
                    onClick={() => setMembers(members.filter((m) => m.id !== member.id))}
                    className="text-sm text-gray-400 transition hover:text-gray-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {members.length < 20 && (
              <>
                {isAddingMember ? (
                  <div className="flex items-center gap-3 rounded-xl border border-[#3d3d5e] px-5 py-3">
                    <input
                      type="text"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newMemberName.trim()) {
                          const newMember: Member = {
                            id: Date.now(),
                            name: newMemberName.trim(),
                            email: '',
                            pivot: { trip_id: tripId || '', user_id: Date.now(), role: 'member' },
                          };
                          setMembers([...members, newMember]);
                          setNewMemberName('');
                          setIsAddingMember(false);
                        }
                        if (e.key === 'Escape') {
                          setIsAddingMember(false);
                          setNewMemberName('');
                        }
                      }}
                      placeholder="Enter name..."
                      autoFocus
                      className="flex-1 text-sm text-gray-700 outline-none"
                    />
                    <button
                      onClick={() => {
                        if (newMemberName.trim()) {
                          const newMember: Member = {
                            id: Date.now(),
                            name: newMemberName.trim(),
                            email: '',
                            pivot: { trip_id: tripId || '', user_id: Date.now(), role: 'member' },
                          };
                          setMembers([...members, newMember]);
                          setNewMemberName('');
                          setIsAddingMember(false);
                        }
                      }}
                      className="text-sm font-medium text-[#3d3d5e] hover:text-[#2f2f4a]"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsAddingMember(true)}
                      className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-gray-300 px-5 py-3 text-sm text-gray-400 transition hover:border-[#3d3d5e] hover:text-[#3d3d5e]"
                    >
                      + Add member
                    </button>
                    <button className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-gray-300 px-5 py-3 text-sm text-gray-400 transition hover:border-[#3d3d5e] hover:text-[#3d3d5e]">
                      + Invite link
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <img src="/vehicles/Union.svg" alt="" className="fixed bottom-10 right-10 hidden h-40 w-auto opacity-10 grayscale pointer-events-none md:block" />
      </main>

      <nav className="fixed bottom-0 left-0 z-50 flex w-full border-t border-gray-200 bg-white md:hidden">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={`/travel/${tripId}/${item.path}`}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition ${
                isActive ? 'text-[#3d3d5e]' : 'text-gray-400'
              }`
            }
          >
            <img src={item.icon} alt={item.label} className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default TeamPage;
