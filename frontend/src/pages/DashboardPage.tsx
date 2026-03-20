const trips = [
  { name: 'Trip Name', location: 'Location', date: 'Date from and to', members: 5, status: 'Planning' },
  { name: 'Trip Name', location: 'Location', date: 'Date from and to', members: 5, status: 'Planning' },
  { name: 'Trip Name', location: 'Location', date: 'Date from and to', members: 5, status: 'Planning' },
  { name: 'Trip Name', location: 'Location', date: 'Date from and to', members: 5, status: 'In Progress' },
  { name: 'Trip Name', location: 'Location', date: 'Date from and to', members: 5, status: 'Done' },
  { name: 'Trip Name', location: 'Location', date: 'Date from and to', members: 5, status: 'Done' },
];

const notifications = [
  { name: 'Name', text: 'Added new task' },
  { name: 'Name', text: 'Added new task' },
];

const tasks = [
  { title: 'Untitled', name: 'Name', date: 'DD MM' },
  { title: 'Untitled', name: 'Name', date: 'DD MM' },
];

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

const DashboardPage = () => {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-[#f9f9fb] px-8 py-6">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]">
            Add trip
          </button>
          <button className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            Modify
          </button>
        </div>
      </div>

      <h2 className="mb-4 text-base font-medium text-gray-900">My Trips</h2>

      <div className="flex items-start gap-6">
        {/* Trips Grid in white block */}
        <div className="flex-1 rounded-xl bg-white p-5">
          <div className="grid grid-cols-3 gap-5">
            {trips.map((trip, index) => (
              <div
                key={index}
                className="cursor-pointer rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
              >
                {/* Image placeholder with status */}
                <div className="relative h-36 rounded-t-xl bg-[#dde2f0]">
                  <span className={`absolute top-3 right-3 rounded border bg-white px-3 py-0.5 text-xs font-medium ${statusStyle(trip.status)}`}>
                    {trip.status}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">{trip.name}</h3>
                  <div className="mb-1 flex items-center gap-2 text-sm text-gray-400">
                    <img src="/icons/location.svg" alt="" className="h-4 w-4 opacity-50" />
                    <span>{trip.location}</span>
                  </div>
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
                    <img src="/icons/date.svg" alt="" className="h-4 w-4 opacity-50" />
                    <span>{trip.date}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm text-gray-400">
                    <span>{trip.members} Members</span>
                    <span className="text-gray-300">&gt;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 space-y-6">
          {/* Notifications */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-base font-bold text-gray-900">Notifications</h3>
            <div className="space-y-3">
              {notifications.map((notif, index) => (
                <div key={index} className="flex items-center gap-3 rounded-xl bg-[#eeeef8] px-4 py-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{notif.name}</p>
                    <p className="text-xs text-gray-500">{notif.text}</p>
                  </div>
                  <button className="text-sm text-gray-400 hover:text-gray-700">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Soon to do */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-base font-bold text-gray-900">Soon to do</h3>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="rounded-xl border border-gray-200 p-4">
                  <p className="mb-3 font-semibold text-gray-900">{task.title}</p>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-300" />
                    <span className="text-xs text-gray-600">{task.name}</span>
                    <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                      <img src="/icons/date.svg" alt="" className="h-4 w-4 opacity-50" />
                      {task.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
