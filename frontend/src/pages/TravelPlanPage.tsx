import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getTrip, type Trip } from '../api';

const sidebarItems = [
  { label: 'Team', icon: '/icons/team.svg', path: 'team' },
  { label: 'Travel Plan', icon: '/icons/travel-plan.svg', path: 'travel-plan' },
  { label: 'Kanban Board', icon: '/icons/kanban-board.svg', path: 'kanban' },
  { label: 'Expenses', icon: '/icons/expenses.svg', path: 'expenses' },
];

interface DayPlan {
  date: string;
  events: string[];
}

const days: DayPlan[] = [
  {
    date: 'March 11, 2026',
    events: ['Event 1', 'Event 2'],
  },
  {
    date: 'March 12, 2026',
    events: ['Event 1', 'Event 2'],
  },
];

const TravelPlanPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    if (!tripId) return;
    getTrip(tripId).then(setTrip).catch(console.error);
  }, [tripId]);
  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      {/* Sidebar */}
      <aside className="w-60 border-r border-gray-200 bg-white px-4 py-6">
        <NavLink to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/vehicles/hot-air-balloon.svg" alt="" className="h-[100px] w-auto opacity-20 grayscale" />
            <h1 className="text-2xl font-bold text-gray-900">Travel plan</h1>
          </div>
          <button className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]">
            Add an event
          </button>
        </div>

        {/* Days */}
        <div className="space-y-6">
          {days.map((day) => (
            <div key={day.date}>
              {/* Date Label */}
              <div className="mb-3 inline-block rounded border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700">
                {day.date}
              </div>

              {/* Events */}
              <div className="space-y-3 rounded-xl border border-dashed border-gray-300 p-6">
                {day.events.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-full border border-gray-200 bg-white px-5 py-3"
                  >
                    <span className="text-sm text-gray-700">{event}</span>
                    <button className="text-sm text-gray-400 transition hover:text-gray-700">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Watermark */}
        <img src="/vehicles/Union.svg" alt="" className="fixed bottom-10 right-10 h-40 w-auto opacity-10 grayscale pointer-events-none" />
      </main>
    </div>
  );
};

export default TravelPlanPage;
