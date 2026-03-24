import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard, createTrip, deleteTrip, type Trip } from '../api';

const statusStyle = (status: string) => {
  switch (status) {
    case 'Planning':
      return 'border-[#3d3d5e] text-[#3d3d5e]';
    case 'In Progress':
      return 'border-[#F0C040] text-[#F0C040]';
    case 'Done':
      return 'border-[#84DCC6] text-[#84DCC6]';
    default:
      return 'border-gray-400 text-gray-400';
  }
};

const getTripStatus = (trip: Trip) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(trip.start_date);
  const end = new Date(trip.end_date);
  if (today > end) return 'Done';
  if (today >= start && today <= end) return 'In Progress';
  return 'Planning';
};

const formatDate = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${s.toLocaleDateString('en-US', opts)} - ${e.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`;
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [deadlines, setDeadlines] = useState<{ id: string; trip_id: string; title: string; status: string; due_date: string | null; assigned_to: number | null }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTrip, setNewTrip] = useState({
    title: '',
    destination: '',
    start_date: '',
    end_date: '',
    budget_amount: 0,
    budget_currency: 'USD',
  });

  const handleDeleteTrip = async (tripId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this trip?')) return;
    try {
      await deleteTrip(tripId);
      setTrips(trips.filter((t) => t.id !== tripId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTrip = async () => {
    if (!newTrip.title.trim()) return;
    try {
      const created = await createTrip(newTrip);
      setTrips([...trips, created]);
      setShowForm(false);
      setNewTrip({ title: '', destination: '', start_date: '', end_date: '', budget_amount: 0, budget_currency: 'USD' });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDashboard()
      .then((data) => {
        setTrips(data.trips || []);
        setDeadlines(((data.deadlines as { id: string; trip_id: string; title: string; status: string; due_date: string | null; assigned_to: number | null }[]) || []).filter((d) => d.status !== 'completed'));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-57px)] items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-57px)] bg-[#f9f9fb] px-4 py-4 md:px-8 md:py-6">
      <div className="mb-4 flex flex-col items-center md:mb-2 md:flex-row md:justify-between">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
          <span className="md:hidden">My Trips </span>Dashboard
        </h1>
        <div className="mt-2 flex items-center gap-2 md:mt-0 md:gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
          >
            Add trip
          </button>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            ☰ Sort by
          </button>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Filter
          </button>
        </div>
      </div>

      <h2 className="mb-4 text-lg font-bold text-gray-900 md:text-base md:font-medium">My Trips</h2>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex-1 rounded-xl bg-white p-4 md:p-5">
          {trips.length === 0 ? (
            <p className="py-8 text-center text-gray-400">No trips yet</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/travel/${trip.id}/team`)}
                  className="cursor-pointer rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
                >
                  <div className="relative h-36 rounded-t-xl bg-[#dde2f0]">
                    {trip.cover_image_url && (
                      <img src={trip.cover_image_url} alt="" className="h-full w-full rounded-t-xl object-cover" />
                    )}
                    <span className={`absolute top-3 left-3 rounded border bg-white px-3 py-0.5 text-xs font-medium ${statusStyle(getTripStatus(trip))}`}>
                      {getTripStatus(trip)}
                    </span>
                    <button
                      onClick={(e) => handleDeleteTrip(trip.id, e)}
                      className="absolute top-3 right-3 rounded-full bg-white/80 px-2 py-0.5 text-xs text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="mb-2 font-semibold text-gray-900">{trip.title}</h3>
                    <div className="mb-1 flex items-center gap-2 text-sm text-gray-400">
                      <img src="/icons/location.svg" alt="" className="h-4 w-4 opacity-50" />
                      <span>{trip.destination || 'No location'}</span>
                    </div>
                    <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
                      <img src="/icons/date.svg" alt="" className="h-4 w-4 opacity-50" />
                      <span>{trip.start_date && trip.end_date ? formatDate(trip.start_date, trip.end_date) : 'No date'}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm text-gray-400">
                      <span>Members</span>
                      <span className="text-gray-300">&gt;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full space-y-6 md:w-72">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-base font-bold text-gray-900">Soon to do</h3>
            {deadlines.length === 0 ? (
              <p className="text-sm text-gray-400">No upcoming tasks</p>
            ) : (
              <div className="space-y-3">
                {deadlines.map((task, index) => (
                  <div key={index} className="rounded-xl border border-gray-200 p-4">
                    <p className="mb-1 font-semibold text-gray-900">{task.title}</p>
                    <p className="mb-3 text-xs text-gray-400">{trips.find((t) => t.id === task.trip_id)?.title || ''}</p>
                    <div className="flex items-center gap-3">
                      <span className={`rounded border bg-white px-3 py-0.5 text-xs font-medium ${
                        task.status === 'in_progress'
                          ? 'border-[#F0C040] text-[#F0C040]'
                          : 'border-[#3d3d5e] text-[#3d3d5e]'
                      }`}>
                        {task.status === 'in_progress' ? 'In Progress' : 'To Do'}
                      </span>
                      <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                        <img src="/icons/date.svg" alt="" className="h-4 w-4 opacity-50" />
                        {task.due_date ? new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
          <div className="w-[450px] rounded-2xl bg-white p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-6 text-xl font-bold text-gray-900">Create New Trip</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Trip Name *</label>
                <input
                  type="text"
                  value={newTrip.title}
                  onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
                  placeholder="My Awesome Trip"
                  autoFocus
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Destination</label>
                <input
                  type="text"
                  value={newTrip.destination}
                  onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                  placeholder="Kyiv, Ukraine"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={newTrip.start_date}
                    onChange={(e) => setNewTrip({ ...newTrip, start_date: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={newTrip.end_date}
                    onChange={(e) => setNewTrip({ ...newTrip, end_date: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Budget</label>
                  <input
                    type="number"
                    value={newTrip.budget_amount || ''}
                    onChange={(e) => setNewTrip({ ...newTrip, budget_amount: Number(e.target.value) })}
                    placeholder="1000"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Currency</label>
                  <select
                    value={newTrip.budget_currency}
                    onChange={(e) => setNewTrip({ ...newTrip, budget_currency: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UAH">UAH</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTrip}
                className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
