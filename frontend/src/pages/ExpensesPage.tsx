import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const sidebarItems = [
  { label: 'Team', icon: '/icons/team.svg', path: 'team' },
  { label: 'Expenses', icon: '/icons/expenses.svg', path: 'expenses' },
];

const CHART_COLORS = ['#3d3d5e', '#84DCC6', '#F1AAB9', '#7ab0d4', '#F0C040'];

const expenseCategories = [
  {
    name: 'Tents',
    total: 800,
    items: [
      { label: 'Tent rental', amount: 500 },
      { label: 'Tent accessories', amount: 300 },
    ],
  },
  {
    name: 'Food',
    total: 700,
    items: [
      { label: 'Groceries', amount: 450 },
      { label: 'Restaurants', amount: 250 },
    ],
  },
  {
    name: 'Transport',
    total: 300,
    items: [
      { label: 'Fuel', amount: 180 },
      { label: 'Parking', amount: 120 },
    ],
  },
];

const ExpensesPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const chartData = expenseCategories.map((cat) => ({
    name: cat.name,
    value: cat.total,
  }));

  const toggleCategory = (name: string) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      {/* Sidebar */}
      <aside className="w-60 border-r border-gray-200 bg-white px-4 py-6">
        <NavLink to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
          &lt; Back
        </NavLink>
        <h2 className="mb-6 text-xl font-bold text-gray-900">Travel Name</h2>
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
        <div className="mb-6 flex items-center gap-3">
          <img src="/vehicles/hot-air-balloon.svg" alt="" className="h-[100px] w-auto opacity-20 grayscale" />
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
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
        <div className="mb-6 flex gap-4">
          <div className="flex flex-1 items-center justify-between rounded-xl bg-[#3d3d5e] px-6 py-3 font-semibold text-white">
            <span>Global Amount</span>
            <span>50 000</span>
          </div>
          <div className="flex flex-1 cursor-pointer items-center justify-between rounded-xl bg-[#3d3d5e] px-6 py-3 font-semibold text-white transition hover:bg-[#2f2f4a]">
            <span>Add new expense</span>
            <span className="text-xl">+</span>
          </div>
        </div>

        {/* Chart + Categories */}
        <div className="flex gap-6">
          {/* Pie Chart */}
          <div className="flex h-64 w-64 items-center justify-center rounded-xl bg-white p-4 shadow-sm">
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
                    <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Categories */}
          <div className="flex-1 space-y-4">
            {expenseCategories.map((cat) => (
              <div key={cat.name}>
                <p className="mb-1 text-sm font-medium text-gray-700">{cat.name}</p>
                <button
                  onClick={() => toggleCategory(cat.name)}
                  className="flex w-full items-center justify-between rounded-xl bg-[#eeeef8] px-5 py-3 transition hover:bg-[#e4e4f0]"
                >
                  <span className="text-sm font-semibold text-gray-900">Total: {cat.total}</span>
                  <span className={`text-gray-500 transition ${openCategory === cat.name ? 'rotate-180' : ''}`}>
                    ⌄
                  </span>
                </button>
                {openCategory === cat.name && (
                  <div className="mt-2 space-y-2 rounded-xl bg-white px-5 py-3 shadow-sm">
                    {cat.items.map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm text-gray-700">
                        <span>{item.label}</span>
                        <span className="font-medium">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Watermark */}
        <img src="/vehicles/Union.svg" alt="" className="fixed bottom-10 right-10 h-40 w-auto opacity-10 grayscale pointer-events-none" />
      </main>
    </div>
  );
};

export default ExpensesPage;
