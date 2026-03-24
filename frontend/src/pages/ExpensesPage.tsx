import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getTrip, getTripExpenses, createExpense, deleteExpense, type Trip, type Expense } from '../api';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const sidebarItems = [
  { label: 'Team', icon: '/icons/team.svg', path: 'team' },
  { label: 'Travel Plan', icon: '/icons/travel-plan.svg', path: 'travel-plan' },
  { label: 'Kanban Board', icon: '/icons/kanban-board.svg', path: 'kanban' },
  { label: 'Expenses', icon: '/icons/expenses.svg', path: 'expenses' },
];

const CHART_COLORS = ['#3d3d5e', '#84DCC6', '#F1AAB9', '#7ab0d4', '#F0C040'];

const ExpensesPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ title: '', total_amount: 0, currency: 'USD', paid_by: 0, splits: [] as number[] });

  useEffect(() => {
    if (!tripId) return;
    setLoading(true);
    Promise.all([getTrip(tripId), getTripExpenses(tripId)])
      .then(([tripData, expensesData]) => {
        setTrip(tripData);
        setExpenses(expensesData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tripId]);

  const handleCreateExpense = async () => {
    if (!tripId || !newExpense.title.trim() || !newExpense.total_amount) return;
    try {
      await createExpense(tripId, newExpense);
      const updated = await getTripExpenses(tripId);
      setExpenses(updated);
      setShowForm(false);
      setNewExpense({
        title: '',
        total_amount: 0,
        currency: 'USD',
        paid_by: 1,
        splits: [1],
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteExpense = async (expenseId: string) => {
  if (!tripId) return;
  try {
    await deleteExpense(tripId, expenseId);
    setExpenses(expenses.filter((e) => e.id !== expenseId));
  } catch (err) {
    console.error(err);
  }
};

const globalAmount = expenses.reduce((sum, e) => sum + parseFloat(e.total_amount), 0);
const budgetRemaining = trip ? parseFloat(trip.budget_amount) - globalAmount : 0;


  const chartData = expenses.map((e) => ({
    name: e.title,
    value: parseFloat(e.total_amount),
  }));

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
        <NavLink
          to="/dashboard"
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
        >
          &lt; Back
        </NavLink>
        <h2 className="mb-6 text-xl font-bold text-gray-900">
          {trip?.title || 'Travel Name'}
        </h2>
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
        <div className="mb-4 flex flex-col items-center md:mb-6 md:flex-row md:gap-3">
          <img
            src="/vehicles/hot-air-balloon.svg"
            alt=""
            className="hidden h-[100px] w-auto opacity-20 grayscale md:block"
          />
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
            <span className="md:hidden">{trip?.title} </span>Expenses
          </h1>
        </div>

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:gap-4">
          <div className="flex flex-1 items-center justify-between rounded-xl bg-[#3d3d5e] px-4 py-3 text-sm font-semibold text-white md:px-6 md:text-base">
            <span>Global Amount</span>
            <span>{globalAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-1 items-center justify-between rounded-xl bg-[#3d3d5e] px-4 py-3 text-sm font-semibold text-white md:px-6 md:text-base">
            <span>Budget Left</span>
            <span>{budgetRemaining.toFixed(2)} {trip?.budget_currency || ''}</span>
          </div>
          <div
            onClick={() => setShowForm(true)}
            className="flex flex-1 cursor-pointer items-center justify-between rounded-xl bg-[#3d3d5e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2f2f4a] md:px-6 md:text-base"
          >
            <span>Add new expense</span>
            <span className="text-xl">+</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="mx-auto flex h-64 w-64 min-h-[256px] min-w-[256px] items-center justify-center rounded-xl bg-white p-4 shadow-sm">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={90}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((_entry, index) => (
                      <Cell
                        key={index}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-400">No expenses yet</p>
            )}
          </div>

          <div className="flex-1 space-y-4">
            {expenses.length === 0 ? (
              <p className="text-sm text-gray-400">No expenses yet</p>
            ) : (
              expenses.map((expense, index) => (
                <div key={expense.id}>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">{expense.title}</p>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-xs text-gray-400 transition hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                  <div
                    className="rounded-xl px-5 py-3"
                    style={{ backgroundColor: `${CHART_COLORS[index % CHART_COLORS.length]}20`, borderLeft: `4px solid ${CHART_COLORS[index % CHART_COLORS.length]}` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Total: {expense.total_amount} {expense.currency}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowForm(false)}
          >
            <div
              className="w-[400px] rounded-2xl bg-white p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Add Expense
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newExpense.title}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, title: e.target.value })
                    }
                    placeholder="Dinner, Hotel..."
                    autoFocus
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Amount *
                    </label>
                    <input
                      type="number"
                      value={newExpense.total_amount || ''}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          total_amount: Number(e.target.value),
                        })
                      }
                      placeholder="100"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Currency
                    </label>
                    <select
                      value={newExpense.currency}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          currency: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#3d3d5e]"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="UAH">UAH</option>
                      <option value="GBP">GBP</option>
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
                  onClick={handleCreateExpense}
                  className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <img
          src="/vehicles/Union.svg"
          alt=""
          className="pointer-events-none fixed right-10 bottom-10 hidden h-40 w-auto opacity-10 grayscale md:block"
        />
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

export default ExpensesPage;
