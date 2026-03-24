import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getTrip, getTripPlan, createPlanItem, deletePlanItem, type Trip, type PlanItem } from '../api';

const sidebarItems = [
  { label: 'Team', icon: '/icons/team.svg', path: 'team' },
  { label: 'Travel Plan', icon: '/icons/travel-plan.svg', path: 'travel-plan' },
  { label: 'Kanban Board', icon: '/icons/kanban-board.svg', path: 'kanban' },
  { label: 'Expenses', icon: '/icons/expenses.svg', path: 'expenses' },
];

const formatDateLabel = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const generateDays = (startDate: string, endDate: string) => {
  const days: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const current = new Date(start);
  while (current <= end) {
    days.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return days;
};

const TravelPlanPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEventTitle, setNewEventTitle] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!tripId) return;
    setLoading(true);
    Promise.all([getTrip(tripId), getTripPlan(tripId)])
      .then(([tripData, planData]) => {
        setTrip(tripData);
        setPlanItems(planData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tripId]);

  const daysList = trip ? generateDays(trip.start_date, trip.end_date) : [];

  const getEventsForDay = (day: string) => {
    return planItems.filter((item) => item.date.startsWith(day));
  };

  const handleAddEvent = async (day: string) => {
    const title = newEventTitle[day]?.trim();
    if (!tripId || !title) return;
    try {
      const created = await createPlanItem(tripId, { title, date: day });
      setPlanItems([...planItems, created]);
      setNewEventTitle({ ...newEventTitle, [day]: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async (planId: string) => {
    if (!tripId) return;
    try {
      await deletePlanItem(tripId, planId);
      setPlanItems(planItems.filter((p) => p.id !== planId));
    } catch (err) {
      console.error(err);
    }
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

      <main className="relative flex-1 bg-[#f9f9fb] p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/vehicles/hot-air-balloon.svg" alt="" className="h-[100px] w-auto opacity-20 grayscale" />
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              <span className="md:hidden">{trip?.title} </span>Travel Plan
            </h1>
          </div>
        </div>

        <div className="space-y-6">
          {daysList.map((day) => {
            const events = getEventsForDay(day);
            return (
              <div key={day}>
                <div className="mb-3 inline-block rounded border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700">
                  {formatDateLabel(day)}
                </div>

                <div className="space-y-3 rounded-xl border border-dashed border-gray-300 p-6">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between rounded-full border border-gray-200 bg-white px-5 py-3"
                    >
                      <span className="text-sm text-gray-700">{event.title}</span>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-sm text-gray-400 transition hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3">
                    <input
                      type="text"
                      value={newEventTitle[day] || ''}
                      onChange={(e) => setNewEventTitle({ ...newEventTitle, [day]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddEvent(day);
                      }}
                      placeholder="Add event..."
                      className="flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                    />
                    <button
                      onClick={() => handleAddEvent(day)}
                      className="text-sm font-medium text-[#3d3d5e] hover:text-[#2f2f4a]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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

export default TravelPlanPage;
