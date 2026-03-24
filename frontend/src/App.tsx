import { Routes, Route, BrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExpensesPage from './pages/ExpensesPage';
import TeamPage from './pages/TeamPage';
import KanbanPage from './pages/KanbanPage';
import TravelPlanPage from './pages/TravelPlanPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './Layout';
import ProtectedRoute from './components/protected-route/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signup" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="travel/:tripId/team" element={<TeamPage />} />
            <Route path="travel/:tripId/travel-plan" element={<TravelPlanPage />} />
            <Route path="travel/:tripId/kanban" element={<KanbanPage />} />
            <Route path="travel/:tripId/expenses" element={<ExpensesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
