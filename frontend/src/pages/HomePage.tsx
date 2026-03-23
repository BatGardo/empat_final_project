import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';

const chartPreviewData = [
  { name: 'Tents', value: 800 },
  { name: 'Food', value: 700 },
  { name: 'Transport', value: 300 },
];

const CHART_COLORS = ['#3d3d5e', '#84DCC6', '#F1AAB9'];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="flex min-h-[calc(100vh-57px)] items-center justify-center bg-[#eeeef8] px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-6">
            <img src="/vehicles/airplaine.svg" alt="Airplane" className="h-[100px] w-[100px]" />
            <img src="/vehicles/ship.svg" alt="Ship" className="h-[100px] w-[100px]" />
            <img src="/vehicles/old-train-1.svg" alt="Train" className="h-[100px] w-[100px]" />
            <img src="/vehicles/bike-1.svg" alt="Bike" className="h-[100px] w-[100px]" />
          </div>

          <h1 className="mb-4 max-w-xl text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Organize Group Travel Faster With Baza Grunt Osnova
          </h1>

          <p className="mb-8 max-w-[590px] text-2xl text-gray-900">
            The essential tool for organizing shared trips.
            <br />
            Create a group, share the invite link, and manage tasks
            and expenses together in one place.
          </p>

          <button className="rounded-full bg-[#3d3d5e] px-8 py-3 text-base font-medium text-white transition hover:bg-[#2f2f4a]">
            Start Planning
          </button>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto flex max-w-6xl items-center gap-16">
          <div className="flex-1">
            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900">
              Replace Spreadsheets
              <br />
              and Group Chats
            </h2>

            <p className="mb-4 text-xl text-gray-700">
              Organizing a trip with multiple people usually means lost links,
              confusing text threads, and manual math.
            </p>
            <p className="mb-8 text-xl text-gray-700">
              Baza Grunt Osnova removes the chaos by putting your tasks,
              deadlines, and shared expenses in one strictly organized
              dashboard.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <img src="/icons/user.svg" alt="" className="mt-0.5 h-5 w-5" />
                <p className="text-xl text-gray-700">
                  <span className="font-bold">User Friendly.</span> The interface is clean, allowing anyone in
                  your group to immediately understand how use it.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <img src="/icons/total.svg" alt="" className="mt-0.5 h-5 w-5" />
                <p className="text-xl text-gray-700">
                  <span className="font-bold">Total Accountability.</span> Everyone sees the todo list and who
                  is responsible for each item.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <img src="/icons/finance.svg" alt="" className="mt-0.5 h-5 w-5" />
                <p className="text-xl text-gray-700">
                  <span className="font-bold">Financial Clarity.</span> The system calculates exactly who
                  owes what, automatically.
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate('/travel/019d0145-5951-736c-9831-04fc78994e8d/expenses')}
            className="w-[560px] cursor-pointer rounded-2xl border border-gray-200 bg-[#f9f9fb] p-8 shadow-lg transition hover:shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Expenses</h3>
              <span className="rounded-full bg-[#3d3d5e] px-3 py-1 text-xs font-medium text-white">
                Add an event
              </span>
            </div>

            <div className="mb-3 flex justify-end gap-2">
              <span className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-500">☰ Sort by</span>
              <span className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-500">Filter</span>
            </div>

            <div className="mb-4 flex items-center justify-between rounded-lg bg-[#3d3d5e] px-4 py-2 text-sm font-semibold text-white">
              <span>Global Amount</span>
              <span>1 233 321</span>
            </div>

            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-[#eeeef8] px-4 py-2 text-xs">
                <span className="text-gray-500">Grocery</span>
                <span className="font-semibold text-gray-700">Total costs: 800</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-48 w-48 min-h-[192px] min-w-[192px]">
                <PieChart width={192} height={192}>
                  <Pie
                    data={chartPreviewData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartPreviewData.map((_entry, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-xs text-gray-400">Calculation: No one has calculated anything yet</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
