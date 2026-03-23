import { useAuth } from '../../hooks/useAuth';

interface LogoutButtonProps {
  onAction?: () => void;
  className?: string;
}

const LogoutButton = ({ onAction, className }: LogoutButtonProps) => {
  const { handleLogout } = useAuth();

  const handleClick = () => {
    handleLogout();
    if (onAction) {
      onAction();
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      Logout
    </button>
  );
};

export default LogoutButton;
