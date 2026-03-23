import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getTrip, getTripMembers, getTripTasks, createTask, updateTask, deleteTask, type Trip, type Member, type ApiTask } from '../api';

const sidebarItems = [
  { label: 'Team', icon: '/icons/team.svg', path: 'team' },
  { label: 'Travel Plan', icon: '/icons/travel-plan.svg', path: 'travel-plan' },
  { label: 'Kanban Board', icon: '/icons/kanban-board.svg', path: 'kanban' },
  { label: 'Expenses', icon: '/icons/expenses.svg', path: 'expenses' },
];

const columnNames = ['To Do', 'Doing', 'Done'];

const statusMap: Record<string, string> = {
  pending: 'To Do',
  in_progress: 'Doing',
  completed: 'Done',
};


const KanbanPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [tasks, setTasks] = useState<ApiTask[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showMoveForm, setShowMoveForm] = useState(false);
  const [showDoneForm, setShowDoneForm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [selectedDoneTaskId, setSelectedDoneTaskId] = useState<string>('');
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [newTask, setNewTask] = useState({ title: '', description: '', notes: '' });

  useEffect(() => {
    if (!tripId) return;
    setLoading(true);
    Promise.all([getTrip(tripId), getTripMembers(tripId), getTripTasks(tripId)])
      .then(([tripData, membersData, tasksData]) => {
        setTrip(tripData);
        const saved = localStorage.getItem(`members_${tripId}`);
        if (saved) {
          const localMembers: Member[] = JSON.parse(saved);
          const apiIds = new Set(membersData.map((m: Member) => m.id));
          const localOnly = localMembers.filter((m) => !apiIds.has(m.id));
          setMembers([...membersData, ...localOnly]);
        } else {
          setMembers(membersData);
        }
        setTasks(tasksData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tripId]);

  const handleAddTask = async () => {
    if (!tripId || !newTask.title.trim()) return;
    try {
      const created = await createTask(tripId, {
        title: newTask.title,
        status: 'pending',
        importance: 'medium',
      });
      setTasks([...tasks, created]);
      setShowForm(false);
      setNewTask({ title: '', description: '', notes: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveToDoing = async () => {
    if (!selectedTaskId || !selectedMemberId) return;
    try {
      const updated = await updateTask(tripId!, selectedTaskId, {
        status: 'in_progress',
        assigned_to: Number(selectedMemberId),
      });
      setTasks(tasks.map((t) => (t.id === selectedTaskId ? updated : t)));
      setShowMoveForm(false);
      setSelectedTaskId('');
      setSelectedMemberId('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveToDone = async () => {
    if (!selectedDoneTaskId) return;
    try {
      const updated = await updateTask(tripId!, selectedDoneTaskId, { status: 'completed' });
      setTasks(tasks.map((t) => (t.id === selectedDoneTaskId ? updated : t)));
      setShowDoneForm(false);
      setSelectedDoneTaskId('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(tripId!, taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  const getMemberName = (userId: number | null) => {
    if (!userId) return null;
    const member = members.find((m) => m.id === userId);
    return member?.name || null;
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

      <main className="relative flex-1 bg-[#f9f9fb] p-8">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/vehicles/hot-air-balloon.svg" alt="" className="h-[100px] w-auto opacity-20 grayscale" />
            <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
          >
            Add task
          </button>
        </div>

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

        <div className="flex gap-6">
          {columnNames.map((colName) => {
            const colTasks = tasks.filter((t) => statusMap[t.status] === colName);
            return (
              <div key={colName} className="flex-1 rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between rounded-lg bg-[#eeeef8] px-4 py-2">
                  <span className="text-sm font-semibold text-gray-900">{colName}</span>
                  <button
                    onClick={() => {
                      if (colName === 'To Do') setShowForm(true);
                      else if (colName === 'Doing') setShowMoveForm(true);
                      else setShowDoneForm(true);
                    }}
                    className="text-lg text-gray-500 hover:text-gray-700"
                  >
                    +
                  </button>
                </div>

                <div className="space-y-4">
                  {colTasks.map((task) => {
                    const assigneeName = getMemberName(task.assigned_to);
                    return (
                      <div key={task.id} className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-semibold text-gray-900">{task.title}</span>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-sm text-gray-400 transition hover:text-red-500"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="mb-1 text-xs text-gray-400">Importance: {task.importance}</p>
                        <div className="mb-3 border-b border-gray-200" />
                        <div className="flex items-center gap-3">
                          {assigneeName ? (
                            <>
                              <div className="h-8 w-8 rounded-full bg-gray-300" />
                              <span className="text-xs text-gray-600">{assigneeName}</span>
                            </>
                          ) : (
                            <>
                              <div className="h-8 w-8 rounded-full border-2 border-dashed border-gray-300" />
                              <span className="text-xs text-gray-400">To be assign</span>
                            </>
                          )}
                          <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                            <img src="/icons/date.svg" alt="" className="h-4 w-4" />
                            {task.due_date
                              ? new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                              : 'No date'}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  <div
                    onClick={() => {
                      if (colName === 'To Do') setShowForm(true);
                      else if (colName === 'Doing') setShowMoveForm(true);
                      else setShowDoneForm(true);
                    }}
                    className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-4 min-h-[180px] text-gray-400 transition hover:border-gray-400 hover:text-gray-500"
                  >
                    <span className="text-2xl">+</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
            <div className="w-[400px] rounded-2xl bg-white p-8" onClick={(e) => e.stopPropagation()}>
              <h2 className="mb-6 text-xl font-bold text-gray-900">Add Task</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Task name"
                    autoFocus
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  />
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
                  onClick={handleAddTask}
                  className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {showMoveForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowMoveForm(false)}>
            <div className="w-[400px] rounded-2xl bg-white p-8" onClick={(e) => e.stopPropagation()}>
              <h2 className="mb-6 text-xl font-bold text-gray-900">Move to Doing</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Select Task</label>
                  <select
                    value={selectedTaskId}
                    onChange={(e) => setSelectedTaskId(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  >
                    <option value="">Choose a task...</option>
                    {tasks.filter((t) => t.status === 'pending').map((t) => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Assign to</label>
                  <select
                    value={selectedMemberId}
                    onChange={(e) => setSelectedMemberId(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  >
                    <option value="">Choose a member...</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowMoveForm(false)}
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMoveToDoing}
                  className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
                >
                  Move
                </button>
              </div>
            </div>
          </div>
        )}

        {showDoneForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowDoneForm(false)}>
            <div className="w-[400px] rounded-2xl bg-white p-8" onClick={(e) => e.stopPropagation()}>
              <h2 className="mb-6 text-xl font-bold text-gray-900">Move to Done</h2>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Select Task</label>
                <select
                  value={selectedDoneTaskId}
                  onChange={(e) => setSelectedDoneTaskId(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                >
                  <option value="">Choose a task...</option>
                  {tasks.filter((t) => t.status === 'in_progress').map((t) => (
                    <option key={t.id} value={t.id}>{t.title} ({getMemberName(t.assigned_to)})</option>
                  ))}
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowDoneForm(false)}
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMoveToDone}
                  className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        <img src="/vehicles/Union.svg" alt="" className="fixed bottom-10 right-10 h-40 w-auto opacity-10 grayscale pointer-events-none" />
      </main>
    </div>
  );
};

export default KanbanPage;
