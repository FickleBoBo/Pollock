interface ButtonProps {
  className?: string;
  text?: string;
  children?: React.ReactNode;
  onClick: () => void;
}

const Button = ({ className, text, children, onClick }: ButtonProps) => {
  return (
    <div>
      {children ? (
        <button onClick={onClick} className={className}>
          {children}
        </button>
      ) : (
        <button onClick={onClick} className={className}>
          {text}
        </button>
      )}
    </div>
  );
};

export default Button;
