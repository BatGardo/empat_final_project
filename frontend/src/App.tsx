import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountsPage from './pages/AccountsPage';
import ExpensesPage from './pages/ExpensesPage';
import TeamPage from './pages/TeamPage';
import KanbanPage from './pages/KanbanPage';
import TravelPlanPage from './pages/TravelPlanPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="travel/:tripId/team" element={<TeamPage />} />
          <Route path="travel/:tripId/travel-plan" element={<TravelPlanPage />} />
          <Route path="travel/:tripId/kanban" element={<KanbanPage />} />
          <Route path="travel/:tripId/expenses" element={<ExpensesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;