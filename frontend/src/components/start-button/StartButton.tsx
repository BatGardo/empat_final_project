import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const StartButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const startPlanning = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login', { state: { from: '/dashboard' } });
    }
  };

  return (
    <button
      onClick={startPlanning}
      className="bg-primary hover:bg-hover-violet rounded-full px-6 py-3 text-xl font-semibold text-white md:px-12 lg:text-2xl"
    >
      Start Planning
    </button>
  );
};

export default StartButton;
