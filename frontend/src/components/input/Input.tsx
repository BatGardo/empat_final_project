import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, required, ...props }: InputProps) => {
  const inputId =
    props.id ||
    (label ? `input-${label.replace(' ', '-').toLowerCase()}` : undefined);

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="mb-2 block justify-self-start">
          {label}
          {required && <p className="text-red-600"></p>}
        </label>
      )}

      <input
        id={inputId}
        required={required}
        className={`h-10 w-full rounded-lg border bg-white px-4 py-3 ${
          error
            ? 'border-red-600 focus:outline-hidden'
            : 'border-border focus:outline-hidden'
        } `}
        {...props}
      ></input>

      {error && (
        <p className="mt-2 block justify-self-start text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
