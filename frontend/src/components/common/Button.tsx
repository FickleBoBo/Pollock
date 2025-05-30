interface ButtonProps {
  className?: string;
  text?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

const Button = ({
  className,
  text,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children || text}
    </button>
  );
};

export default Button;
