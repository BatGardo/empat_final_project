import { useNavigate } from 'react-router';

interface LoginButtonProps {
  onAction?: () => void;
  className?: string;
}

const LoginButton = ({ onAction, className }: LoginButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login', { state: { from: '/' } });
    if (onAction) {
      onAction();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className ? className : 'text-base'}
    >
      Log in
    </button>
  );
};

export default LoginButton;
