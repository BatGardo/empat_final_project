import { useNavigate } from 'react-router';

interface SignupButtonProps {
  onAction?: () => void;
  className?: string;
}

const SignupButton = ({ onAction }: SignupButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup', { state: { from: '/' } });
    if (onAction) {
      onAction();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-primary hover:bg-hover-violet rounded-full px-4 py-2 font-semibold text-white"
    >
      Sign up
    </button>
  );
};

export default SignupButton;
