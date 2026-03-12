import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountsPage from './pages/AccountsPage';
import Layout from './Layout';

function App() {
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    async function checkBackend() {
      try {
        const res = await fetch(`${API_URL}/health`);
        const data = await res.json();
        console.log('Backend status:', data);
      } catch (err) {
        console.error('Backend error:', err);
      }
    }

    checkBackend();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="accounts" element={<AccountsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;