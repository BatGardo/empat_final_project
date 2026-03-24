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

  const isMobile = !!className;

  return (
    <button
      onClick={handleClick}
      className={className ? className : 'text-base'}
    >
      Log in
      {isMobile && (
        <img
          src="/icons/chevron.svg"
          alt="Go"
          className="-rotate-90 opacity-50"
        />
      )}
    </button>
  );
};

export default LoginButton;
