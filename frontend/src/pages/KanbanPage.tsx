import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getTrip, type Trip } from '../api';

const sidebarItems = [
  { label: 'Team', icon: '/icons/team.svg', path: 'team' },
  { label: 'Travel Plan', icon: '/icons/travel-plan.svg', path: 'travel-plan' },
  { label: 'Kanban Board', icon: '/icons/kanban-board.svg', path: 'kanban' },
  { label: 'Expenses', icon: '/icons/expenses.svg', path: 'expenses' },
];

interface Task {
  title: string;
  description: string;
  notes: string;
  assignee: string | null;
  date: string;
}

interface Column {
  name: string;
  tasks: Task[];
}

const columns: Column[] = [
  {
    name: 'To Do',
    tasks: [
      { title: 'Untitled', description: 'Description', notes: 'Type here...', assignee: null, date: 'DD MM' },
      { title: 'Untitled', description: 'Description', notes: 'Type here...', assignee: null, date: 'DD MM' },
    ],
  },
  {
    name: 'Doing',
    tasks: [
      { title: 'Untitled', description: 'Description', notes: 'Type here...', assignee: 'Name', date: 'DD MM' },
      { title: 'Untitled', description: 'Description', notes: 'Type here...', assignee: 'Name', date: 'DD MM' },
    ],
  },
  {
    name: 'Done',
    tasks: [
      { title: 'Untitled', description: 'Description', notes: 'Type here...', assignee: 'Name', date: 'DD MM' },
      { title: 'Untitled', description: 'Description', notes: 'Type here...', assignee: 'Name', date: 'DD MM' },
    ],
  },
];

const KanbanPage = () => {
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
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/vehicles/hot-air-balloon.svg" alt="" className="h-[100px] w-auto opacity-20 grayscale" />
            <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
          </div>
          <button className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]">
            Add task
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

        {/* Kanban Columns */}
        <div className="flex gap-6">
          {columns.map((column) => (
            <div key={column.name} className="flex-1 rounded-xl border border-gray-200 bg-white p-4">
              {/* Column Header */}
              <div className="mb-4 flex items-center justify-between rounded-lg bg-[#eeeef8] px-4 py-2">
                <span className="text-sm font-semibold text-gray-900">{column.name}</span>
                <button className="text-lg text-gray-500 hover:text-gray-700">+</button>
              </div>

              {/* Tasks */}
              <div className="space-y-4">
                {column.tasks.map((task, index) => (
                  <div key={index} className="rounded-xl border border-gray-200 bg-white p-4">
                    {/* Task Header */}
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{task.title}</span>
                      <span className="cursor-pointer text-gray-400">⌄</span>
                    </div>

                    {/* Description */}
                    <p className="mb-1 text-xs text-gray-400">{task.description}</p>

                    {/* Notes */}
                    <p className="mb-1 text-xs text-gray-400">Notes:</p>
                    <p className="mb-3 text-xs text-gray-500">{task.notes}</p>

                    {/* Divider */}
                    <div className="mb-3 border-b border-gray-200" />

                    {/* Assignee + Date */}
                    <div className="flex items-center gap-3">
                      {task.assignee ? (
                        <>
                          <div className="h-8 w-8 rounded-full bg-gray-300" />
                          <span className="text-xs text-gray-600">{task.assignee}</span>
                        </>
                      ) : (
                        <>
                          <div className="h-8 w-8 rounded-full border-2 border-dashed border-gray-300" />
                          <span className="text-xs text-gray-400">To be assign</span>
                        </>
                      )}
                      <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                        <img src="/icons/date.svg" alt="" className="h-4 w-4" /> {task.date}
                      </span>
                    </div>
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

export default KanbanPage;
