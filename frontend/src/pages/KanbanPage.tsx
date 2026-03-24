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
  const [newTask, setNewTask] = useState({ title: '', importance: 'medium', due_date: '', assigned_to: '' });
  const [editingTask, setEditingTask] = useState<ApiTask | null>(null);
  const [editForm, setEditForm] = useState({ title: '', importance: 'medium', due_date: '', assigned_to: '' });
  const [mobileStage, setMobileStage] = useState('To Do');

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
        importance: newTask.importance || 'medium',
        ...(newTask.assigned_to ? { assigned_to: Number(newTask.assigned_to) } : {}),
        ...(newTask.due_date ? { due_date: newTask.due_date } : {}),
      });
      setTasks([...tasks, created]);
      setShowForm(false);
      setNewTask({ title: '', importance: 'medium', due_date: '', assigned_to: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (task: ApiTask) => {
    setEditingTask(task);
    setEditForm({
      title: task.title,
      importance: task.importance || 'medium',
      due_date: task.due_date || '',
      assigned_to: task.assigned_to ? String(task.assigned_to) : '',
    });
  };

  const handleEditTask = async () => {
    if (!tripId || !editingTask || !editForm.title.trim()) return;
    try {
      const updated = await updateTask(tripId, editingTask.id, {
        title: editForm.title,
        importance: editForm.importance,
        assigned_to: editForm.assigned_to ? Number(editForm.assigned_to) : null,
        due_date: editForm.due_date || null,
      });
      setTasks(tasks.map((t) => (t.id === editingTask.id ? updated : t)));
      setEditingTask(null);
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

      <main className="relative flex-1 bg-[#f9f9fb] p-4 pb-20 md:p-8">
        <div className="mb-4 flex flex-col items-center md:mb-2 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/vehicles/hot-air-balloon.svg" alt="" className="hidden h-[100px] w-auto opacity-20 grayscale md:block" />
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              <span className="md:hidden">{trip?.title} </span>Kanban Board
            </h1>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 border-b border-gray-200 pb-4 md:mb-6 md:justify-end md:gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
          >
            Add task
          </button>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            ☰ Sort by
          </button>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Filter
          </button>
        </div>

        <div className="mb-4 flex gap-2 md:hidden">
          {columnNames.map((name) => (
            <button
              key={name}
              onClick={() => setMobileStage(name)}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition ${
                mobileStage === name
                  ? 'bg-[#3d3d5e] text-white'
                  : 'border border-gray-300 bg-white text-gray-600'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="hidden gap-6 md:flex">
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
                      <div key={task.id} onClick={() => openEditModal(task)} className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-semibold text-gray-900">{task.title}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}
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

        <div className="space-y-4 md:hidden">
          {tasks
            .filter((t) => statusMap[t.status] === mobileStage)
            .map((task) => {
              const assigneeName = getMemberName(task.assigned_to);
              return (
                <div key={task.id} onClick={() => openEditModal(task)} className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{task.title}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}
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
                  {mobileStage === 'To Do' && (
                    <button
                      onClick={() => {
                        setSelectedTaskId(task.id);
                        setShowMoveForm(true);
                      }}
                      className="mt-3 w-full rounded-lg bg-[#eeeef8] py-2 text-xs font-medium text-[#3d3d5e] transition hover:bg-[#e4e4f0]"
                    >
                      Move to Doing →
                    </button>
                  )}
                  {mobileStage === 'Doing' && (
                    <button
                      onClick={() => {
                        setSelectedDoneTaskId(task.id);
                        setShowDoneForm(true);
                      }}
                      className="mt-3 w-full rounded-lg bg-[#eeeef8] py-2 text-xs font-medium text-[#3d3d5e] transition hover:bg-[#e4e4f0]"
                    >
                      Move to Done ✓
                    </button>
                  )}
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
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Importance</label>
                  <select
                    value={newTask.importance}
                    onChange={(e) => setNewTask({ ...newTask, importance: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Assign to</label>
                  <select
                    value={newTask.assigned_to}
                    onChange={(e) => setNewTask({ ...newTask, assigned_to: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  >
                    <option value="">Unassigned</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
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

        {editingTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setEditingTask(null)}>
            <div className="w-[400px] rounded-2xl bg-white p-8" onClick={(e) => e.stopPropagation()}>
              <h2 className="mb-6 text-xl font-bold text-gray-900">Edit Task</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    autoFocus
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Importance</label>
                  <select
                    value={editForm.importance}
                    onChange={(e) => setEditForm({ ...editForm, importance: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Assign to</label>
                  <select
                    value={editForm.assigned_to}
                    onChange={(e) => setEditForm({ ...editForm, assigned_to: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  >
                    <option value="">Unassigned</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    value={editForm.due_date}
                    onChange={(e) => setEditForm({ ...editForm, due_date: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setEditingTask(null)}
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditTask}
                  className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

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

export default KanbanPage;
